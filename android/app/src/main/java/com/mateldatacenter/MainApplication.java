package com.mateldatacenterapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactlibrary.RNCustomKeyboardKitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import codes.simen.IMEI.IMEI;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.github.hush2.RNAndroidDeviceInfo.RNAndroidDeviceInfoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCustomKeyboardKitPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new IMEI(),
            new RNDeviceInfo(),
            new RNAndroidDeviceInfoPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
