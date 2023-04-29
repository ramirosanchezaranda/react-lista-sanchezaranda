import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, Modal, TouchableOpacity } from 'react-native';

const Item = ({title, onDelete, onCheck, isReady}) => (
  <View style={isReady ? [styles.item, styles.itemReady] : styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <TouchableOpacity onPress={onCheck}>
        <Image
            style={styles.icon}
            source={require("./assets/check-icon.png")}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={{marginLeft: 3}}>
        <Image
            style={styles.icon}
            source={require("./assets/delete-icon.png")}
          />
      </TouchableOpacity>
    </View>
  </View>
);

export default function App() {
  const [itemList, setItemList] = useState([{id: '0.14816516', title: 'Primer item de prueba', isReady: true}]);
  const [valueText, setValueText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const add = ()=>{
    if (!valueText) return console.warn("Campo vacío");
    setItemList([...itemList, {id: Math.random().toString(), title: valueText, isReady:false}]);
    setValueText('');
  }

  const onHandlerModal = (id)=>{
    setModalVisible(true);
    const item = itemList.find(item => item.id === id);
    setSelectedItem(item);
  }

  const onCancel = ()=>{
    setModalVisible(false);
    setSelectedItem(null);
  }

  const onDelete = (id)=>{
    const newList = itemList.filter(item => item.id !== id);
    setItemList(newList);
    setModalVisible(false);
    setSelectedItem(null);
  }

  const onCheck = (id)=>{
    const ModifiedList = itemList.map(item => {
      if (item.id === id){
        item.isReady = !item.isReady;
      }
      return item;
    })
    setItemList(ModifiedList);
    setSelectedItem(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.agregarContainer}>
        <TextInput onChangeText={(text)=> setValueText(text)} value={valueText} placeholder='Escriba lo que desea añadir' placeholderTextColor='white' style={styles.textInputAgregar}/>
        <Button title='Agregar' color='#40434E' onPress={add}/>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={itemList}
          renderItem={({item}) =><Item title={item.title} onDelete={()=> onHandlerModal(item.id)} onCheck={()=> onCheck(item.id)} isReady={item.isReady}/>}
          keyExtractor={item => item.id}
        />
      </View>

      <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.container}>
          <Text style={styles.title}>Detalle</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.selectedItem}>{selectedItem?.title}</Text>
            <Text style={styles.detailMessage}>¿Estas seguro que deseas borrarlo?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              title='Cancel'
              color='#52528C'
              onPress={onCancel}
            />
            <Button 
            title='Delete'
            color='#52528C'
            onPress={() => onDelete(selectedItem?.id)}
            />
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080705',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    paddingTop: 30,
    paddingHorizontal: 30
  },
  agregarContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  textInputAgregar:{
    borderBottomColor: '#FFFFFA',
    borderBottomWidth: 1,
    width: '70%',
    color: '#FFFFFA'
  },
  listContainer:{
    marginVertical: 16
  },
  item: {
    backgroundColor: '#702632',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemReady:{
    backgroundColor: 'green',
  },
  title:{
    color: '#FFFFFA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon:{
    width: 32,
    height: 32,
  },
  detailContainer: {
    paddingVertical: 20,
  },
  detailMessage: {
    fontSize: 14,
    color: '#fff',
  },
  selectedItem: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
