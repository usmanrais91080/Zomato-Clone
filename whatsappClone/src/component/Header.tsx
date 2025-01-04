import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';

interface HeaderProps {
  title?: string;
  icons: any;
  onPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({title, icons, onPress}: any) => {
  const [showModal, setShowModal] = useState(false);

  // Function to handle modal visibility toggle
  const toggleModal = () => setShowModal(!showModal);

  // icons
  const HeaderIcons = {
    cameraoutline: require('../assets/icons/cameraoutline.png'),
    searchicon: require('../assets/icons/searchicon.png'),
    option: require('../assets/icons/option.png'),
    videoCall: require('../assets/icons/videocalloutline.png'),
    call: require('../assets/icons/calloutline.png'),
  };

  return (
    <View style={{paddingHorizontal: 7}}>
      {/* Header */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{flex: 1, fontWeight: '700', fontSize: 25, color: 'green'}}>
          {title}
        </Text>

        {/* header icons */}
        <View style={{flexDirection: 'row', gap: 20}}>
          {icons?.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={icon === 'option' ? toggleModal : undefined}>
              <Image source={HeaderIcons[icon]} style={styles.headerIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modal */}
      <Modal visible={showModal} transparent onRequestClose={toggleModal}>
        {/* Modal overlay */}
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            {/* Prevent clicks from closing modal inside */}
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Modal content */}
                <Text style={styles.modalOption}>New Group</Text>
                <Text style={styles.modalOption}>Settings</Text>
                <Text style={styles.modalOption}>Log Out</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    justifyContent: 'flex-start',
  },
  modalContent: {
    position: 'absolute',
    right: 6,
    top: 30,
    width: 170,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
    resizeMode: 'contain',
  },
});
