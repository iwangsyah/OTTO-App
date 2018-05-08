import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  body: {
    backgroundColor: '#f3f3f3',
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  inspectionRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  inspectionRowContent: {
    flex: 1
  },
  inspectionRowInspectionName: {
    color: '#107DCB',
    fontSize: 18,
    fontWeight: 'bold'
  },
})
