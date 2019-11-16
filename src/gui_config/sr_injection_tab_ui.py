# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file './sr_injection_tab.ui'
#
# Created by: PyQt5 UI code generator 5.13.0
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_SRInjectionTab(object):
    def setupUi(self, SRInjectionTab):
        SRInjectionTab.setObjectName("SRInjectionTab")
        SRInjectionTab.resize(776, 451)
        self.gridLayout = QtWidgets.QGridLayout(SRInjectionTab)
        self.gridLayout.setObjectName("gridLayout")
        spacerItem = QtWidgets.QSpacerItem(40, 20, QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Minimum)
        self.gridLayout.addItem(spacerItem, 2, 3, 1, 1)
        self.downPushButton = QtWidgets.QPushButton(SRInjectionTab)
        self.downPushButton.setObjectName("downPushButton")
        self.gridLayout.addWidget(self.downPushButton, 2, 4, 1, 1)
        self.addPushButton = QtWidgets.QPushButton(SRInjectionTab)
        self.addPushButton.setObjectName("addPushButton")
        self.gridLayout.addWidget(self.addPushButton, 2, 1, 1, 1)
        self.deletePushButton = QtWidgets.QPushButton(SRInjectionTab)
        self.deletePushButton.setObjectName("deletePushButton")
        self.gridLayout.addWidget(self.deletePushButton, 2, 2, 1, 1)
        self.upPushButton = QtWidgets.QPushButton(SRInjectionTab)
        self.upPushButton.setObjectName("upPushButton")
        self.gridLayout.addWidget(self.upPushButton, 2, 5, 1, 1)
        self.importButton = QtWidgets.QPushButton(SRInjectionTab)
        self.importButton.setObjectName("importButton")
        self.gridLayout.addWidget(self.importButton, 2, 0, 1, 1)
        self.injectionsTable = QtWidgets.QTableWidget(SRInjectionTab)
        self.injectionsTable.setEditTriggers(QtWidgets.QAbstractItemView.NoEditTriggers)
        self.injectionsTable.setDragEnabled(False)
        self.injectionsTable.setDragDropOverwriteMode(False)
        self.injectionsTable.setAlternatingRowColors(False)
        self.injectionsTable.setSelectionMode(QtWidgets.QAbstractItemView.SingleSelection)
        self.injectionsTable.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.injectionsTable.setShowGrid(True)
        self.injectionsTable.setGridStyle(QtCore.Qt.SolidLine)
        self.injectionsTable.setCornerButtonEnabled(False)
        self.injectionsTable.setObjectName("injectionsTable")
        self.injectionsTable.setColumnCount(3)
        self.injectionsTable.setRowCount(2)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setVerticalHeaderItem(0, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setVerticalHeaderItem(1, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setHorizontalHeaderItem(0, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setHorizontalHeaderItem(1, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setHorizontalHeaderItem(2, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setItem(0, 0, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setItem(0, 1, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setItem(0, 2, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setItem(1, 0, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setItem(1, 1, item)
        item = QtWidgets.QTableWidgetItem()
        self.injectionsTable.setItem(1, 2, item)
        self.injectionsTable.horizontalHeader().setCascadingSectionResizes(False)
        self.injectionsTable.horizontalHeader().setDefaultSectionSize(200)
        self.injectionsTable.horizontalHeader().setStretchLastSection(True)
        self.injectionsTable.verticalHeader().setVisible(False)
        self.injectionsTable.verticalHeader().setCascadingSectionResizes(True)
        self.injectionsTable.verticalHeader().setHighlightSections(True)
        self.injectionsTable.verticalHeader().setSortIndicatorShown(False)
        self.gridLayout.addWidget(self.injectionsTable, 0, 0, 1, 6)

        self.retranslateUi(SRInjectionTab)
        self.injectionsTable.cellActivated['int','int'].connect(self.deletePushButton.toggle)
        QtCore.QMetaObject.connectSlotsByName(SRInjectionTab)

    def retranslateUi(self, SRInjectionTab):
        _translate = QtCore.QCoreApplication.translate
        SRInjectionTab.setWindowTitle(_translate("SRInjectionTab", "Form"))
        self.downPushButton.setText(_translate("SRInjectionTab", "▼ Down"))
        self.addPushButton.setText(_translate("SRInjectionTab", "⊕ Add"))
        self.deletePushButton.setText(_translate("SRInjectionTab", "⌫ Delete"))
        self.upPushButton.setText(_translate("SRInjectionTab", "▲ Up"))
        self.importButton.setText(_translate("SRInjectionTab", "⎈ Import"))
        self.injectionsTable.setSortingEnabled(False)
        item = self.injectionsTable.verticalHeaderItem(0)
        item.setText(_translate("SRInjectionTab", "Injection 1"))
        item = self.injectionsTable.verticalHeaderItem(1)
        item.setText(_translate("SRInjectionTab", "Injection 2"))
        item = self.injectionsTable.horizontalHeaderItem(0)
        item.setText(_translate("SRInjectionTab", "Name"))
        item = self.injectionsTable.horizontalHeaderItem(1)
        item.setText(_translate("SRInjectionTab", "Enabled"))
        item = self.injectionsTable.horizontalHeaderItem(2)
        item.setText(_translate("SRInjectionTab", "Conditions"))
        __sortingEnabled = self.injectionsTable.isSortingEnabled()
        self.injectionsTable.setSortingEnabled(False)
        item = self.injectionsTable.item(0, 0)
        item.setText(_translate("SRInjectionTab", "multChoice"))
        item = self.injectionsTable.item(0, 1)
        item.setText(_translate("SRInjectionTab", "✓"))
        item = self.injectionsTable.item(0, 2)
        item.setText(_translate("SRInjectionTab", "[\"tag\", \"endsWith\", \"context\"]"))
        item = self.injectionsTable.item(1, 0)
        item.setText(_translate("SRInjectionTab", "multChoiceBack"))
        item = self.injectionsTable.item(1, 1)
        item.setText(_translate("SRInjectionTab", "✗"))
        item = self.injectionsTable.item(1, 2)
        item.setText(_translate("SRInjectionTab", "[\"&\", [\"tag\", \"endsWith\", \"context\"], [\"iter\", \"startsWith\", \"+\"]]"))
        self.injectionsTable.setSortingEnabled(__sortingEnabled)
