from functools import reduce

version_string = '2.2'

def safenav_preset(preset):

    def safenav_mod(records, props=[], preds=[], default=None):
        return safenav(records.extend(preset), props, preds, default)

    return safenav_mod

def safenav(records, props=[], preds=[], default=None):

    nothing = {}

    def access(record, prop):
        nonlocal nothing

        try:
            return record[prop]
        except:
            return nothing

    def find_record(found_record, record):
        nonlocal nothing

        if found_record is not nothing:
            return found_record
        else:
            preresult = reduce(access, props, record)

            def test_preresult(shortcut_value, pred):
                nonlocal preresult
                return shortcut_value and pred(preresult)

            return (preresult
                    if reduce(test_preresult, preds, True)
                    else nothing)

    result = reduce(find_record, records, nothing)
    return default if result is nothing else result

