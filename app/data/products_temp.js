var data = {
  //主分类：成品类型
  'finished': [{
    //见识使用时间戳作为ID使用，避免重复: new Date().getTime();
    'id': 'f_0',
    //产品名称的型号
    'type': 'PBR-M1',
    //用于表示当前产品所在层级目录，使用"/"隔开【如：'a/b'标示产品位于'a'目录下的'b'目录里面】。如果没有层级则为空字符。
    'path': 'MediaTek/MT7628',
    //产品名称
    'name': {
        //产品封面图片
        'cover': 'pro_m1_cover.png',
        //产品对比时使用的小图
        'comp': 'pro_m1_comp.png'
    },
    //产品配图，注意：请将图片放在app/img/pro中，然后在这里直接填写图片的名称即可。
    'image': 'img_product_pbr.png',
    //产品介绍
    'summary': 'PBR-C1 4G无线路由器采用MTK MT7628解决方案，使用基于OpenWrt自主深度开发的PandoraBox操作系统，兼容移动、联通、电信三家运营商主流的4G/3G上网卡，可将4G/3G信号转化为无线WI-FI，让你在户外旅途中随时随地乐享无线WIFI。在已提供有线网络的宾馆、家庭、办公室，直接插上网线即将有线网络转化为WI-FI，无需设置即实现WI-FI上网。它内置标准的5200mAh移动电源，保证产品长时间高效工作，同时可给普通智能手机充电，外出办公、旅行再也不用为没电而担心。特有的电量显示按键，轻按此键即可了解电池的剩余电量。支持宾馆、家庭、4G/3G路由三种模式，可智能识别并自动切换到对应模式。在出差办公、户外旅行时4G301都能为您提供高速的无线接入。是商务人士出差旅行必备神器。',
    //产品的特点
    'features': [
      '4G/3G无线路由器：兼容最新技术的4G上网卡，向下可更好的兼容主流3G上网卡。可将4G/3G信号转化为WI-FI，随时随地连接WI-FI上网。',
      '有线网络转化为WI-FI：在已提供有线网络的宾馆、家庭、办公室，插上网线即将有线网络转化为WI-FI，实现多人多设备WI-FI上网',
      '5200mAh移动电源：内置标准5200mAh移动电源，不损害手机、Ipad电池，可给普通智能手机充电2-3次'
    ],
    //产品的参数
    'params': {
      //  硬件参数
      'hardware':{
        //每个参数都是数组，将所有描述该类型的字段。
        'IEEE Standard': ['描述a','描述b'],
        'CPU': [],
        'Flash': [],
        'USB Port': [],
        'RAM': [],
        'WAN': [],
        'LAN': [],
        'WiFi': [],
        'Wireless Speed': [],
        'Antenna': [],
        'Wireless Power': [],
        'Wireless Repeater': [],
        'SATA Port': [],
        'TF-Card Slot': [],
        'SIM Card Slot': [],
        'Battery': [],
        'NFC': [],
        'I2S / PCM': [],
        'UART': [],
        'Button': [],
        'Size': [],
          //其他不匹配项，请填入这里
          'hard_others': ['a项','b项']
      },
        //3G/4G规格的所有参数
      'network': {
        '3G / LTE': []
      },
      //软件参数
      'software': {
          // 同上
        'Operating System': [],
        'Priority Control': [],
        'File Server Functionality': [],
        'VPN': [],
        'Firewall / Security': [],
        'Port Fowarding / DMZ / uPNP': [],
          'soft_others': ['a项','b项']//其他该类型中无匹配项，每项为一个素组元素哈
      },
      //  其他参数，可自行添加字段
      'others': {
        'temperature': [],//温度相关
        'SSID': [],//SSID相关
        'accessories': ['包装配件 M1*1《快速安装指南》*1 网线 *1 保修卡 *1 适配器 *1'],//包装配件相关
          'thirdparty': ['第三方认证 FCC/CE/RoHS/WEEE'],//第三方认证
          'associated': ['相关联产品 4G300、4G302、3G189E、3G-W6'],//相关联产品
      //    这栏如果有新增的项，你自己命名就行了哈
      }
    }
  }],
    //主分类：半成品类型  配置同上
    'unfinished': [{
        'id': 'f_0',
        'type': 'PBR-M1',
        //用于表示当前解决方案所在层级，如果没有层级则留空。
        'path': 'MediaTek/MT7628',
        'name': 'PBR-M2全千兆无线路由器无线路由器',
        'image': 'img_product_pbr.png',
        'summary': 'PBR-C1 4G无线路由器采用MTK MT7628解决方案，使用基于OpenWrt自主深度开发的PandoraBox操作系统，兼容移动、联通、电信三家运营商主流的4G/3G上网卡，可将4G/3G信号转化为无线WI-FI，让你在户外旅途中随时随地乐享无线WIFI。在已提供有线网络的宾馆、家庭、办公室，直接插上网线即将有线网络转化为WI-FI，无需设置即实现WI-FI上网。它内置标准的5200mAh移动电源，保证产品长时间高效工作，同时可给普通智能手机充电，外出办公、旅行再也不用为没电而担心。特有的电量显示按键，轻按此键即可了解电池的剩余电量。支持宾馆、家庭、4G/3G路由三种模式，可智能识别并自动切换到对应模式。在出差办公、户外旅行时4G301都能为您提供高速的无线接入。是商务人士出差旅行必备神器。',
        'features': [
            '4G/3G无线路由器：兼容最新技术的4G上网卡，向下可更好的兼容主流3G上网卡。可将4G/3G信号转化为WI-FI，随时随地连接WI-FI上网。',
            '有线网络转化为WI-FI：在已提供有线网络的宾馆、家庭、办公室，插上网线即将有线网络转化为WI-FI，实现多人多设备WI-FI上网',
            '5200mAh移动电源：内置标准5200mAh移动电源，不损害手机、Ipad电池，可给普通智能手机充电2-3次'
        ],
        'params': {
            'hardware':{
                'IEEE Standard': [],
                'CPU': [],
                'Flash': [],
                'USB Port': [],
                'RAM': [],
                'WAN': [],
                'LAN': [],
                'WiFi': [],
                'Wireless Speed': [],
                'Antenna': [],
                'Wireless Power': [],
                'Wireless Repeater': [],
                'SATA Port': [],
                'TF-Card Slot': [],
                'SIM Card Slot': [],
                'Battery': [],
                'NFC': [],
                'I2S / PCM': [],
                'UART': [],
                'Button': [],
                'Size': [],
                'hard_others': ['a项','b项']//其他该类型中无匹配项，每项为一个素组元素哈
            },
            'network': {//3G/4G规格的所有参数
                '3G / LTE': []
            },
            'software': {
                'Operating System': [],
                'Priority Control': [],
                'File Server Functionality': [],
                'VPN': [],
                'Firewall / Security': [],
                'Port Fowarding / DMZ / uPNP': [],
                'soft_others': ['a项','b项']//其他该类型中无匹配项，每项为一个素组元素哈
            },
            'others': {
                'temperature': [],//温度相关
                'SSID': [],//SSID相关
                'accessories': ['包装配件 M1*1《快速安装指南》*1 网线 *1 保修卡 *1 适配器 *1'],//包装配件相关
                'thirdparty': ['第三方认证 FCC/CE/RoHS/WEEE'],//第三方认证
                'associated': ['相关联产品 4G300、4G302、3G189E、3G-W6'],//相关联产品
                //    这栏如果有新增的项，你自己命名就行了哈
            }
        }
    }]
}
