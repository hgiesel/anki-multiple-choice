/**
 * For all funtions that concerns accessing the html content
 */

import {
  star,
} from '../util.js'

import {
  escapeString,
  treatNewlines,
} from './util.js'

import {
  toSRToken,
  fromSRToken,
  isSRToken,
} from '../util.js'

const htmlTagsRegex = (/<.*?>/gu)
const htmlTagsNoBrRegex = (/<(?!br>).*?>/gu)

export const formatter = function(inputSyntax, injections, iterIndex) {
  let _isInvalid = false
  let _isContained = false

  const isInvalid = function() {
    return _isInvalid
  }

  const isContained = function() {
    return _isContained
  }

  // the original NodeList
  const _htmlContent = {}
  const getHtml = function(theSelector = inputSyntax.cssSelector) {
    if (_htmlContent[theSelector]) {
      return _htmlContent[theSelector]
    }
    else {
      try {
        return _htmlContent[theSelector] = document.querySelectorAll(theSelector)
      }

      catch (e) {
        _isInvalid = true
        return _htmlContent[theSelector] = document.createDocumentFragment().childNodes
      }
    }
  }

  const elemDelim = toSRToken(['ELEMDELIM'])

  // a single big string with inserted elemDelims
  const _rawStructure = {}
  const getRawStructure = function(theSelector = inputSyntax.cssSelector) {
    if (_rawStructure[theSelector]) {
      return _rawStructure[theSelector]
    }

    const theHtml = getHtml(theSelector)

    if (!theHtml || theHtml.length === 0) {
      _isInvalid = true
      return _rawStructure[theSelector] = ''
    }

    const theRawStructure = [...theHtml]
      .map(v => v.innerHTML)
      .join(elemDelim)

    if (theRawStructure.includes('SET RANDOMIZER FRONT TEMPLATE')
      || theRawStructure.includes('SET RANDOMIZER BACK TEMPLATE')
    ) {
      _isContained = true
    }

    return _rawStructure[theSelector] = theRawStructure
  }

  const exprContent = '((?:.|\\n|\\r)*?)'
  const exprString = inputSyntax.isRegex
      ? `${inputSyntax.openDelim}${exprContent}${inputSyntax.closeDelim}`
      : `${escapeString(inputSyntax.openDelim)}${exprContent}${escapeString(inputSyntax.closeDelim)}`

  // the found sets in the text
  const _foundStructure = {}
  const getFoundStructure = function(theSelector = inputSyntax.cssSelector) {
    if (_foundStructure[theSelector]) {
      return _foundStructure[theSelector]
    }

    const theFoundStructure = []
    const theRawStructure = getRawStructure(theSelector)

    let exprRegex = null
    try {
      exprRegex = RegExp(exprString, 'gmu')
    }
    catch (e) {
      console.error('Invalid exprString', e)
      _isInvalid = true
      return _foundStructure[theSelector] = []
    }

    let m = exprRegex.exec(theRawStructure)

    while (m) {
      theFoundStructure.push(m[1])
      m = exprRegex.exec(theRawStructure)
    }

    return _foundStructure[theSelector] = theFoundStructure
  }

  // 2d list of elements in the form of [[i, j, element]]
  const _elementsOriginal = {}
  const getElementsOriginal = function(theSelector = inputSyntax.cssSelector) {
    if (_elementsOriginal[theSelector]) {
      return _elementsOriginal[theSelector]
    }

    const theFoundStructure = getFoundStructure(theSelector)

    const makeInjectionsMeta = '$apply(meta)'
    const injectionKeyword = '$inject'

    const theElementsOriginal = theFoundStructure
      .map(group => group.split(inputSyntax.isRegex
        ? new RegExp(inputSyntax.fieldSeparator, 'u')
        : inputSyntax.fieldSeparator))
      .flatMap(set => (set.includes(injectionKeyword)
        ? [set].concat(injections.map(injectionSet => (
          injectionSet.concat(makeInjectionsMeta)
        )))
        : [set]
      ))
      .map((set, i) => set.map((elem, j) => [iterIndex, i, j, elem, 'n']))

    return _elementsOriginal[theSelector] = theElementsOriginal
  }

  const valuePicker = function(valueSets) {
    const pickValue = function(name, colorRules, classRules) {
      if (!isSRToken(name, 'value')) {
        return name
      }

      const components = fromSRToken(name)

      const valueSetName = components[1]
      const valueSubSet = Number(components[2])
      const valueIndex = Number(components[3])

      let theValue = null

      try {
        theValue = valueSets[valueSetName][valueSubSet].values[valueIndex]
        if (typeof theValue !== 'string') {
          throw 'error'
        }
      }
      catch (e) {
        console.warn(
          'Invalid Value Set Eval or Pick', e,
          `${valueSetName}:${valueSubSet}:${valueIndex}`,
          valueSets,
        )
        return theValue
      }

      const theColor = colorRules
        ? colorRules.find(v => (
          (v[1] === star || v[1] === valueSetName)
          && (v[2] === star || v[2] === valueSubSet)
          && (v[3] === star || v[3] === valueIndex)
        ))
        : null

      const theClass = classRules
        ? classRules.find(v => (
          (v[1] === star || v[1] === valueSetName)
          && (v[2] === star || v[2] === valueSubSet)
          && (v[3] === star || v[3] === valueIndex)
        ))
        : null

      const theColorCss = theColor
        ? ` style="color: ${theColor[0]}"`
        : ''

      const theClassCss = theClass
        ? ` class="${theClass[0]}"`
        : ''

      return `<span${theColorCss}${theClassCss}>${theValue}</span>`
    }

    return {
      pickValue: pickValue,
    }
  }

  const stylingsAccessor = function(styleDefinitions, randomIndices) {
    const propAccessor = function(appliedStyleNames) {
      const styles = appliedStyleNames
        .flatMap((name) => {
          const maybeStyle = styleDefinitions
            .find(s => s.name === name)

          if (maybeStyle) {
            return maybeStyle.stylings
          }

          return []
        })

      /* safenav */
      const getProp = function(props, preds = [], defaultValue = null) {
        const nothing = {}
        const access = (record, prop) => {
          if (Object.is(record, nothing)) {
            return nothing
          }

          try {
            switch (typeof prop) {
              case 'number':
                return prop < record.length
                  ? record[prop]
                  : nothing

              case 'string':
                return prop in record
                  ? record[prop]
                  : nothing

              default:
                return record[prop]
            }
          }

          catch (e) {
            return nothing
          }
        }

        const result = styles.reduce((foundRecord, record) => {
          if (Object.is(foundRecord, nothing)) {
            const preresult = props.reduce(access, record)

            return preds.reduce((shortcutValue, pred) => (
              shortcutValue && pred(preresult)
            ), true)
              ? preresult
              : nothing
          }

          return foundRecord
        }, nothing)

        return Object.is(result, nothing)
          ? defaultValue
          : result
      }

      let currentIndex

      const getNextIndex = function(type /* colors or classes */) {

        let theIndex
        const theProp = getProp([type])
        const propValueLength = getProp([type, 'values']).length

        if (currentIndex === undefined) {
          if (theProp.collectiveIndexing && theProp.randomStartIndex) {

            if (theProp.randomIndices.length === 0) {
              theIndex = Math.floor(Math.random() * propValueLength)
              theProp.randomIndices.push(theIndex)
            }
            else {
              theIndex = theProp.nextIndex === 0
                ? theProp.randomIndices[0]
                : theProp.nextIndex % propValueLength
            }
          }

          else if (theProp.collectiveIndexing) {
            theIndex = theProp.nextIndex % propValueLength
          }

          else if (theProp.randomStartIndex) {
            if (!theProp.setIndex) {
              theProp.setIndex = 0
            }

            theIndex = theProp.randomIndices[theProp.setIndex]

            if (theIndex === undefined) {
              theIndex = Math.floor(Math.random() * propValueLength)
              theProp.randomIndices.push(theIndex)
            }

            theProp.setIndex += 1
          }

          else {
            theIndex = 0
          }
        }

        else {
          theIndex = ++currentIndex % propValueLength
        }

        currentIndex = theIndex
        theProp.nextIndex = currentIndex + 1

        return theIndex
      }

      return {
        getProp: getProp,
        getNextIndex: getNextIndex,
      }
    }

    const importIndices = function() {
      styleDefinitions
        .forEach((def) => {
          ['colors', 'classes'].forEach((type) => {
            def.stylings[type].randomIndices = randomIndices[def.name]
              ? randomIndices[def.name][type]
              : []
            def.stylings[type].nextIndex = 0
          })
        })
    }

    const exportIndices = function() {
      const result = {}

      styleDefinitions
        .forEach((def) => {
          result[def.name] = {}

          ;['colors', 'classes'].forEach((type) => {
            result[def.name][type] = def.stylings[type].randomIndices
          })
        })

      return result
    }

    importIndices()

    return {
      propAccessor: propAccessor,
      exportIndices: exportIndices,
    }
  }

  const renderSets = function(
    reordering,
    styleDefinitions,
    styleApplications,
    randomIndices,
    valueSets,
    numberedSets,
    theSelector = inputSyntax.cssSelector
  ) {
    console.log('ns', numberedSets, reordering)
    const sa = stylingsAccessor(styleDefinitions, randomIndices)
    const vp = valuePicker(valueSets)

    const stylizedResults = Array(reordering.length)

    for (const set of reordering) {
      const actualValues = []

      const pa = sa.propAccessor(styleApplications[set.order])

      if (pa.getProp(['display']) === 'sort') {
        set.rendering.sort()
      }
      else if (pa.getProp(['display']) === 'orig') {
        set.rendering = numberedSets.find(v => v.name === set.order).elements
      }

      for (const elem of set.rendering) {
        const [
          /* iterName */,
          setIndex,
          elemIndex,
          elemContent,
          elemType,
        ] = elem

        if (elemType !== 'd') {
          const theIndex = pa.getNextIndex('colors')

          const colorChoice = Number.isNaN(theIndex)
            ? ''
            : ` color: ${pa.getProp(['colors', 'values'])[theIndex]};`

          const className = `class="set-randomizer--element set-randomizer--element-index-${setIndex}-${elemIndex}"`
          const blockDisplay = pa.getProp(['block'])
            ? ' display: block;'
            : ''

          const style = `style="padding: 0px ${pa.getProp(['fieldPadding'])}px;${colorChoice}${blockDisplay}"`

          const pickedValue = vp.pickValue(elemContent, pa.getProp(['colors', 'rules']), pa.getProp(['classes', 'rules']))
          console.log('pickedValue', pickedValue)

          if (pickedValue) {
            const filterHtml = pa.getProp(['filter'])
            const displayBlock = pa.getProp(['block'])

            const theValue = filterHtml
              ? displayBlock
                ? `<record ${className} ${style}><div>${treatNewlines(pickedValue).replace(htmlTagsNoBrRegex, '')}</div></record>`
                : `<record ${className} ${style}>${pickedValue.replace(htmlTagsRegex, '')}</record>`
              : displayBlock
                ? `<record ${className} ${style}><div>${treatNewlines(pickedValue)}</div></record>`
                : `<record ${className} ${style}>${pickedValue}</record>`

            actualValues.push(theValue)
          }
        }
      }

      if (pa.getProp(['display']) === 'none') {
        stylizedResults[set.order] = ''
      }
      else if (actualValues.length === 0 || pa.getProp(['display']) === 'empty') {
        stylizedResults[set.order] = (
          `${pa.getProp(['openDelim'])}`
          + `${pa.getProp(['emptySet'])}`
          + `${pa.getProp(['closeDelim'])}`
        )
      }
      else if (pa.getProp(['display']) === 'meta') {
        stylizedResults[set.order] = null
      }
      else {
        stylizedResults[set.order] = (
          `${pa.getProp(['openDelim'])}`
          + `${actualValues.join(pa.getProp(['fieldSeparator']))}`
          + `${pa.getProp(['closeDelim'])}`
        )
      }
    }

    let theRawStructure = getRawStructure(theSelector)

    for (const [i, value] of getFoundStructure(theSelector).entries()) {
      if (stylizedResults[i] !== null /* when display:meta */) {
        console.log('meh', stylizedResults)
        theRawStructure = theRawStructure
          .replace((inputSyntax.isRegex
            ? new RegExp(`${inputSyntax.openDelim}${escapeString(value)}${inputSyntax.closeDelim}`, 'u')
            : `${inputSyntax.openDelim}${value}${inputSyntax.closeDelim}`),
          `${stylizedResults[i]}`)
      }
    }

    const theHtml = getHtml(theSelector)

    theRawStructure
      .split(elemDelim)
      .forEach((v, i) => theHtml[i].innerHTML = v)

    if (theSelector === 'div#clozed') {
      const olParse = getElementsOriginal('div#original').flat()

      if (olParse.length > 0) {
        const newReordering = reordering
          .map(v => ({
            rendering: v.rendering
              .map(w => ([
                w[0],
                w[1],
                olParse.find(u => (
                  (u[0] === w[0] && u[1] === w[1])[2]
                )),
                w[3],
              ])),
            order: v.order
          }))

        renderSets(newReordering, renderDirectives, randomIndices, 'div#original')
      }
    }

    return sa.exportIndices()
  }

  return {
    getElementsOriginal: getElementsOriginal,
    renderSets: renderSets,
    isInvalid: isInvalid,
    isContained: isContained,
  }
}

export default formatter
