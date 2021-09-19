import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image, Modal } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
    
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            response.json().then(function(result){ 
              console.log(result)
              return jsonState(result)

              });
          } else {
            throw new Error('An error occurred when trying to reach'+url);
          }
      }).catch(error => {
        console.error(error);
      });
  }

const ShowUserDetails = ({display,toogleModal,mensagem}) =>(
  <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text style={styles.modalMessage}>Hello, pleased to meet you! Contact me by email: {mensagem}</Text>
                </Pressable>
          </View>
        </View>
    
    </Modal>
)

const User = ({id, email,first_name,last_name,avatar}) => {

  const [modal, setModal] = React.useState(false)
  function changeModal(){
    setModal(!modal)
  }

  const full_name = first_name+" "+last_name
  return(
    <View style={styles.listItem}>
      <ShowUserDetails display={modal} toogleModal={changeModal} mensagem={email}/>
      
      <Pressable onPress={changeModal}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: avatar,
          }}
        />

        <Text style={styles.paragraph}>{full_name}</Text>
      </Pressable>
    </View>
  )
}









  const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Lista de usuários</Text>
      </View>
    );
  };

export default function App() {

  const [jsonData,setJsonData] = React.useState({})

  executeGet("https://randomuser.me/api/?page=1&results=10&seed=foobar",setJsonData)

  //função que renderiza cada item do FlatList
  function meuItem({item}){
    
    return(
      <User 
      id ={item.uuid}
      email = {item.email}
      first_name = {item.name.first}
      last_name = {item.name.last}
      avatar = {item.picture.large}
      />
    )
  }
  

  return (

    <View style={styles.container}>

      <FlatList
        data={jsonData.results}
        renderItem={meuItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#FF7A33'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    float: "left"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#FFB533',
  },
    textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    padding: 7,
  },
  listItem:{
    backgroundColor: '#33FFBE',
  },
  modalMessage:{
    alignItems: "center",
  }
});
