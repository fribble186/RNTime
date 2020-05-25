import global from '../../Global';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});
global.storage = storage;

function save(key, data) {
  return new Promise(resolve => {
    global.storage.save({key, data, expires: null});
    resolve();
  });
}

function load(key) {
  return global.storage.load({key});
}

function remove(key) {
  return new Promise(resolve => {
    global.storage.remove({key});
    resolve();
  });
}

export {save, load, remove};
