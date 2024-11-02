import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/461184877_1080201167130354_934555959225370992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF1OYvztxyUATf6-j1khSRlN4WJTXKIg_s3hYlNcoiD-1-BUvSvFlmcpDo5SPWbJmXWkiNpaIFZ26YJ567WS7HU&_nc_ohc=reVkqm4gf3EQ7kNvgH4YcQJ&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=AvZgemuxDfj5V5aoTac9Uvv&oh=00_AYDUEgS-W2j1PnKFURCmaIVMzfIEIR0CFpwQdOvoCEwqGQ&oe=6728E7F0",
          }}
          style={styles.userImg}
        />
        <View style={{gap: 3}}>
          <Text style={styles.txtWelcome}>Welcome!</Text>
          <Text style={styles.userName}>Nguyen Thanh Phong</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  txtWelcome:{
    fontSize: 13,
    color: Colors.darkGrey
  },
  userName: {
    fontWeight: "700",
    fontSize: 15,
    color: Colors.black,
  },
});
