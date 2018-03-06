<?php

function callAPI($sk) {
  $url = 'https://volare.cloud4wi.com/controlpanel/1.0/bridge/sessions/' . $sk;
  
  $ch = curl_init();
  curl_setopt_array($ch, array(
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $url
  ));

  $result=curl_exec($ch);
  curl_close($ch);

  return json_decode($result, true);
};

function getContext($sk) {
  $session = callAPI($sk);
  $tenant = "test";
  $customer = "NA";
  $hotspot = "test";

  if(isset($session['data']['auth'])) {
    $tenant = $session['data']['auth']['tenantId'];
  } else if(isset($session['data']['tenant'])) {
    $tenant = $session['data']['tenant']['tenant_id'];
  }

  if(isset($session['data'])) {
      $customer = $session['data']['customer'];
      if(isset($customer['id'])) {
        $customer = $customer['id'];
      } else {
          $customer = "NA";
      }
      $hotspot = $session['data']['hotspot']['id'];
  }

  $context = array(
    'tenant' => $tenant,
    'customer' => $customer,
    'hotspot' => $hotspot,
  );
  return $context;
};

?>