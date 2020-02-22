if (__DEV__) {
      const tron =
        Reactotron.configure({ host: "192.168.38.7" })
            .useReactNative() 
            .connect();

      console.tron = tron;
      tron.clear();
  }