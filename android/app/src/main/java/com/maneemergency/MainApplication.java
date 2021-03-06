package com.maneemergency;

import android.app.Application;

import com.facebook.FacebookSdk;
import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush("iccm-H-5f3oiYOTezhjgtwDVP5R-f7609b74-b77d-432f-b7ce-ab6b5d303ab1", getApplicationContext(), BuildConfig.DEBUG),
            new FBSDKPackage(mCallbackManager)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {

    super.onCreate();
     FacebookSdk.sdkInitialize(getApplicationContext());
  // If you want to use AppEventsLogger to log events.
  AppEventsLogger.activateApp(this);
    
  }
}
