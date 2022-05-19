import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const base = {
  flex: 1,
  backgroundColor: '#000000',
  color: '#FFF'
}

export const main = {
  backgroundColor: '#000000',
  textAlign: 'center'
};

export const mainPadding = {
  padding: 20,
  backgroundColor: '#000000',
  textAlign: 'center'
};

export const stationsMain = {
  marginHorizontal: -15,
  backgroundColor: '#000000',
  textAlign: 'center'
};

export const safeView = {
  flex: 1,
  backgroundColor: '#1E6738',
}

export const button = {
  backgroundColor: '#007AFF'
}

export const loginScreenButton = {
  //marginRight:20,
  //marginLeft:20,
  height:48,
  marginTop:20,
  paddingTop:10,
  paddingBottom:10,
  backgroundColor:'orange',
  borderRadius:10,
  borderWidth: 1
}

export const loginText = {
    color:'#000000',
    fontSize: 20,
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
}

export const searchButton = {
  marginTop:13,
  marginLeft: 5
}

export const searchButtonText = {
  color:'orange',
  fontSize: 17,
  textAlign:'center',
  marginTop: 3,
  paddingLeft : 10,
  paddingRight : 5
}

export const listButton = {
  //marginRight:20,
  //marginLeft:20,
  height:30,
  marginBottom: 15
}

export const listTextButton = {
  color:'#FFF',
  fontSize: 18,
  paddingLeft : 10,
  paddingRight : 10
}

export const arrDepButton = {
  paddingHorizontal: 0,
  paddingVertical: 7,
  borderRadius: 7,
  backgroundColor: "#232323",
  marginHorizontal: "0%",
  minWidth: '43%',
  textAlign: "center",
}

export const arrDepButtonSelected = {
  paddingHorizontal: 0,
  paddingVertical: 7,
  borderRadius: 7,
  backgroundColor: "orange",
  marginHorizontal: "0%",
  minWidth: '43%',
  textAlign: "center",
}

export const arrDepButtonLabel = {
  fontSize: 14,
  fontWeight: "500",
  color: "orange",
}

export const arrDepButtonSelectedLabel = {
  fontSize: 14,
  fontWeight: "500",
  color: "black",
}

export const arrDepButtonsRow = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: 'space-evenly',
  marginTop: 13,
  marginBottom: 10,
  marginLeft: '7%',
  marginRight: '7%',
  backgroundColor: '#232323',
  borderRadius: 7,
}

export const titleSearchIcon = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 30,
  marginTop: 7
}

export const orangeText = {
  color: 'orange'
}

export const redText = {
  color: 'red'
}

export const greenText = {
  color: '#00FF00'
}

export const whiteText = {
  color: '#FFF'
}

export const blueText = {
  color: 'blue'
}

export const textAlign = {
  textAlign: 'center'
}

export const favoriteStationInfo = {
  minHeight: 40,
  padding: 10
}

export const settingsContainer = {
  flexDirection: 'row',
  justifyContent: 'center',
  //borderWidth: 0.2,
  //borderColor: 'orange',
  width: 260
}