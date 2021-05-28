import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { diff } from 'react-native-reanimated';

export default function App() {
  const [counter,setCounter] = useState(0);
  const [now,setNow] = useState(null);
  const startTime = useRef(null);
  const timer = useRef(null);

  const onStartCounting = () => {
    if(counter === 0){
      startTime.current = new Date();
      timer.current = setInterval(() => {
        setNow(new Date());
      },1);
    }
    setCounter(counter + 1);
  }

  const onReset = () => {
    startTime.current = null;
    setCounter(0);
    clearInterval(timer.current);
  }

  const timeDiff =  (_startTime,_now) => {
    if(_startTime && _now){
      return _now.getTime() - _startTime.getTime();
    }
    return 0;
  }
  const currentSpeed = (count,startTime,now) => {
    if(count < 1 || startTime === null || now === null){
      return 0;
    }
    
    const timediff = timeDiff(startTime,now);
    return Math.round(count/timediff*10000)/10;
  }
  const hTimeDisplay = (timed) => {
    const ms = timed % 1000;
    const s = Math.floor(timed / 1000);
    const m = Math.floor(s/60)

    return `${m}:${(s%60).toString().padStart(2,"0")}:${ms.toString().padStart(3,"0")}`
  }
  
  return (
    <View style={styles.container}>
      <Text style={[styles.marginBtm]}>Lets See How Fast You Can Tap</Text>
      <Text style={[styles.marginBtm]}>Total Clicks: {counter}</Text>
      <Pressable onPress={onStartCounting}>
        <Text style={[styles.speed]}>{currentSpeed(counter,startTime.current,now).toString().padEnd(3," ")} Taps/Sec.</Text>
        <Text style={[styles.marginBtm,startTime.timer]}>Running Time: {hTimeDisplay(timeDiff(startTime.current,now))}</Text>
      </Pressable>
      {/* <ActivityIndicator size="large" /> */}
      <StatusBar style="auto" />
      <Button style={[styles.marginBtm]} onPress={onStartCounting} size="large" title="Tap Tap" />
      <View style={styles.marginTop}>
        <Button color="#fc7c2b" onPress={onReset} title="Reset" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  speed: {
    fontFamily: "Roboto",
    fontSize: 30,
  },
  marginBtm: {
    marginBottom: 30
  },
  dangerBg: {
    backgroundColor: "#fc7c2b"
  },
  marginTop: {
    marginTop: 40
  },
  timer: {
    textAlign: "center"
  }

});
