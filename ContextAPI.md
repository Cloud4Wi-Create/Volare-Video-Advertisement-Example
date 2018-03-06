# My Apps Session Key API Response Structures

Making a GET request to the API url with the session key appended will return with a json object depending on the context with which the API was called.

## API URL

```
https://volare.cloud4wi.com/controlpanel/1.0/bridge/sessions/{SESSION_KEY}
```

## From within the Volare Website

### From Tenant level

```json
{
    "status": "success",
    "data": { 
        "lang": "eng",
        "auth": {
            "level": "tenant",
            "tenantId": "1001"
        }
    }
} 
```

### From Venue level

```json
{
    "status": "success",
    "data": {
        "lang": "eng",
        "auth": {
            "level": "wifiarea",
            "tenantId": "1001",
            "wifiareaId": "3246b0001"
        }
    }
}
```

## From the Access Journey

### Not logged in

```json
{
    "status": "success",
    "data": { 
        "customer": {
            "is_logged": false,
            "lang": "eng"
        }, 
        "hotspot": {
            "city": "Livorno, Italy",
            "id": "9067",
            "identifier": "685112345D_illiade",
            "latitude": "45.960782503827",
            "longitude": "12.091283106750",
            "mac_address": "685112345D",
            "name": "Odissea",
            "state": "Livorno",
            "tag": "hotspot",
            "zip": "Livorno",
        },
        "tenant": {
            "name": "Taylor's Tenant",
            "read_only": false,
            "tenant_id": "1001"
        },
        "wifiarea": {
            "name": "Livorno Venue",
            "wifiarea_id": "18cde0005"
        }
    }
}
```

### Authenticated and logged in

```json
{
    "status": "success",
    "data": { 
        "customer":{
            "is_logged":true,
            "lang":"eng",
            "id":"rlC.6yTePhzYg",
            "first_name":"John",
            "last_name":"Doe",
            "username":"706B5C1D",
            "gender":"",
            "birth_date":"0000-00-00 00:00:00",
            "phone":"",
            "phone_prefix":"",
            "email":"john.doe@cloud4wi.com",
            "mac_address":[]
        },
        "hotspot": {
            "city": "Livorno, Italy",
            "id": "9067",
            "identifier": "685112345D_illiade",
            "latitude": "45.960782503827",
            "longitude": "12.091283106750",
            "mac_address": "685112345D",
            "name": "Odissea",
            "state": "Livorno",
            "tag": "hotspot",
            "zip": "Livorno",
        },
        "tenant": {
            "name": "Taylor's Tenant",
            "read_only": false,
            "tenant_id": "1001"
        },
        "wifiarea": {
            "name": "Livorno Venue",
            "wifiarea_id": "18cde0005"
        }
    }
}
```