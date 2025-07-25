// 由 Deepseek 英文翻译成韩语
export default {
  cdn_p2p: {
    section0: {
      title: '개요',
      list: [
        `중앙 집중식 네트워크에서 비디오, 오디오 및 기타 데이터를 전송하는 것은 비용이 많이 들고 비효율적입니다. 낭비적인 새로운 데이터 센터를 구축하거나 비싼 CDN을 구입하는 대신, 이미 가지고 있는 것을 사용하는 것이 더 책임 있는 방법입니다. 거의 모든 사람들이 여유 대역폭을 가지고 있습니다. 우리는 이 활용되지 않은 자원을 해제함으로써 가치를 창출합니다.`,
        `우리의 P2P 솔루션은 WebRTC를 사용하여 동일한 비디오에 접근하는 최종 사용자 장치 간의 네트워크를 생성합니다. 시청자가 비디오 콘텐츠를 요청하면 시스템은 먼저 네트워크상의 피어에서 사용 가능한지 확인합니다. 사용 가능한 경우 비디오 소스에서 검색하는 대신 피어에서 비디오를 가져옵니다. 사용할 수 없는 경우 비디오 소스에서 직접 검색합니다.`,
        '우리는 시장에서 가장 많은 수의 장치를 지원하는 것을 자랑스럽게 생각합니다. 우리의 SDK는 최고의 엔지니어들에 의해 지속적으로 완성되어 왔습니다.',
      ],
    },
    section1: {
      title: '어떻게 작동하나요?',
      list: [
        `기존의 스트리밍 미디어 모드는 플레이어가 CDN(소스 서버)에서 데이터를 요청하여 점진적으로 재생하는 것입니다. 우리는 클라이언트 측에 SDK를 통합하고 플레이어와 네트워크 사이에 프록시 계층을 내장합니다. WebRTC는 사용자가 서로의 비디오 콘텐츠를 로드할 수 있도록 피어-투-피어 메시 네트워크를 생성하는 데 사용됩니다. 우리의 하이브리드 전환 알고리즘은 시청자가 다음 세그먼트를 P2P 네트워크에서 로드할지 아니면 게시자의 CDN에서 로드할지를 결정합니다. 이를 통해 콘텐츠 제공자의 대역폭 사용을 줄이는 동시에 사용자의 시청 경험을 극대화할 수 있습니다.`,
      ],
    },
    section2: {
      title: '사용자 경험 향상',
      list: [
        '사용자에게 고품질이고 안정적인 비디오 스트림을 제공할 수 있는 것은 높은 서비스 품질을 유지하고 사용자 만족도를 높이기 위한 필수 요소입니다. 우리의 P2P MESH 스트리밍 솔루션을 활용하면 클라이언트에서 스트리밍 서버로의 단일 링크에 의존하지 않으므로 네트워크 중단에 덜 취약해져 더 나은 사용자 경험을 제공할 수 있습니다.',
      ],
    },
    section3: {
      title: 'CDN 비용 절감',
      list: [
        'MESH 네트워킹을 사용하여 대부분의 비디오를 전달합니다. CDN은 P2P 네트워크를 사용할 수 없을 때와 빠른 시작을 위해만 사용됩니다. 귀중한 비용과 자원을 절약할 수 있습니다.',
      ],
    },
    section4: {
      title: '쉬운 통합',
      list: [
        '몇 줄의 코드로 간단하게 통합할 수 있습니다. P2P-CDN 스트리밍으로 전환하는 것은 이전보다 더 쉬워졌습니다. 통합은 단 몇 분 만에 완료됩니다. 모든 CDN과 호환되며 DRM 및 비디오 코덱과 무관합니다. 서버 측 변경이 필요하지 않습니다.',
      ],
    },
    section5: {
      title: 'ISP 친화적',
      list: [
        '피어-투-피어 기능은 인터넷 서비스 제공업체(ISP)의 네트워크 인프라에 부담을 주기 때문에 오랫동안 유익하지 않은 것으로 여겨져 왔습니다. 우리는 ISP와 지역별로 그룹화된 피어들만 상호 연결함으로써 이를 역전시켜, OTT 서비스를 보유한 ISP가 이전에는 불가능했던 방식으로 피어-투-피어의 혜택을 누릴 수 있도록 합니다.',
      ],
    },
    section6: {
      title: '보안 및 개인정보 보호',
      list: [
        '피어 간 - 피어들은 DTLS 암호화를 통해 SCTP 프로토콜을 사용하는 보안 터널인 WebRTC 데이터 채널을 통해 서로 연결됩니다.',
        '각 시청자와 백엔드 간 - 각 시청자는 TLS 암호화를 사용하는 보안 Websocket 연결을 통해 백엔드에 연결됩니다.',
        'P2P 활동은 사용자가 서버로부터 인증을 받은 후에만 작동하기 시작합니다. HTTP 서버는 우리가 활성화되기 전후로 동일한 요청(토큰, 키, 쿠키 등)을 확인합니다.',
        '다운로드된 비디오 청크를 저장하기 위해 SDK는 다른 어떤 애플리케이션도 접근할 수 없는 시청자 장치의 메모리 영역을 사용합니다. 특히 이러한 영역은 브라우저 개발자 도구로 볼 수 없습니다. 어떤 비디오 세그먼트도 HDD에 저장되지 않습니다. 이는 비디오 청크가 복사되어 시청자의 장치에 저장되는 것을 방지합니다.',
        '유사 제품과 비교하여, 우리는 GDPR 준수 기술을 제공합니다. 전달의 법적 안전성 외에도, 우리의 프로토콜은 기술적으로 안전하며 DDoS 및 프로토콜 내 사기 주입에 강합니다.',
      ],
    },
  },
} as const
