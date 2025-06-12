export default {
  cdn_p2p: {
    section0: {
      title: 'Overview',
      list: [
        `Delivering video, audio, and other data on centralized networks is expensive and inefficient. Instead of building wasteful new data centers or buying expensive CDNs, it's more responsible to use what we already have. Almost everybody has spare bandwidth. We creates value by unlocking this under-utilized resource.`,
        `Our P2P solution uses WebRTC to create a network between end-user devices accessing the same video. When a viewer requests video content, the system first checks to see if it is available from peers on the network. If so, it pulls the video from the peer instead of retrieving it from the video source. If it doesn't, it retrieves it directly from the video source.`,
        'We are proud to support the largest number of devices in the market today. Our SDK has been continuously perfected by the best engineers.',
      ],
    },
    section1: {
      title: 'How does it work?',
      list: [
        `The traditional streaming media mode is that the player requests data from the CDN (source server) for progressive playback. we integrates the SDK on the client side, embeds a layer of proxy between the player and the network. WebRTC is used to create a peer-to-peer mesh network that helps users load video content from each other. Our hybrid switching algorithm determines whether a viewer should load the next segment from our p2p network or the publisher’s CDN. This allows us to shrink a content provider's bandwidth usage, while also maximizing a user's viewing experience.`,
      ],
    },
    section2: {
      title: 'Boost User Experience',
      list: [
        'Being able to deliver high quality and stable video stream to the users is a must to maintain high service quality and drive user satisfaction. By utilizing our P2P MESH streaming solution, it does not rely on a single link from a client to your streaming server and therefore less prone to network disruption, which will lead to better user experience.',
      ],
    },
    section3: {
      title: 'Save on CDN Expenses',
      list: [
        'We uses MESH networking to deliver most of the video. Your CDN is only used when p2p network unavailable and to allow faster startup. You can save valuable money and resources.',
      ],
    },
    section4: {
      title: 'Easy to Integrate',
      list: [
        'We allows simple integration with a few lines of code. Switching to P2P-CDN streaming has never been easier. Your integration will be done in mere minutes. Compatible with all CDNs, agnostic to DRM and video codecs. No service side changes required.',
      ],
    },
    section5: {
      title: 'ISP Friendly',
      list: [
        'Peer-to-peer functionality has long been deemed non beneficial for Internet Service Providers as it puts strain on their network infrastructure. we actually reverses that by only interconnecting peers grouped up by ISP and regions, which allows ISPs that have OTT services to benefit from peer-to-peer in way never before possible.',
      ],
    },
    section6: {
      title: 'Security and Privacy',
      list: [
        'Between peers - peers are connected to each other via WebRTC data channel, which is a secure tunnel that uses the SCTP protocli over DTLS encryption.',
        'Between each viewer and the our backend - each viewer is connected to the our backend via a secure Websocket connection that uses TLS encryption.',
        'P2P activity only starts to work AFTER the user is authorized by the server. The HTTP server sees the same exact requests (tokens, keys, cookies, etc.) before and after us is enabled.',
        'To store the downloaded video chunks, the SDK uses areas of the viewer’s device memory that are inaccessible to any other application. In particular, these areas are inaccessible for viewing with in-browser developer tools. No video segments are ever saved to HDD. This protects video chunks from being copied and saved to the viewer’s device.',
        'Compared to similar products, we offers GDPR-compliant technology. In addition to the legal safety of delivery, the our protocol is technically safe and resilient to the DDoS and fraud injections into the protocol.',
      ],
    },
  },
} as const
