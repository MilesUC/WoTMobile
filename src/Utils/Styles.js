import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flexCenter2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
    marginRight: '5%',
    width: '75%'
  }
})

export default Styles
