package com.letrimex.appVendedor;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import androidx.annotation.Nullable;

public class ServiceNotification extends Service {




  //Servicios
  @Override
  public void onCreate(){

  }

  @Override
  public int onStartCommand(Intent intent, int flag, int idProcess){

    return START_STICKY;
  }

  @Override
  public void onDestroy(){

  }

  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }
}
