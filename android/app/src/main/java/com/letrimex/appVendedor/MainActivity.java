package com.letrimex.appVendedor;

import android.app.PendingIntent;
import android.os.Build;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private static final String Channel_ID = "canal";
  private PendingIntent pendingIntent;
  @Override
  protected void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
      showNotification();
    }
    else{
      showNotification();
    }

  }

  private void showNotification() {
  }


}
