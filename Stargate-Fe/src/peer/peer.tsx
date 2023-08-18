class PeerService {
  constructor() {
    if (!this.peer) {
      // RTCPeerConnection 객체를 생성하여 peer 변수에 할당
      this.peer = new RTCPeerConnection({
        // P2P 통신을 위한 ICE 서버 제공
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:global.stun.twilio.com:3478',
            ],
          },
        ],
      });
    }
  }

  reset() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:global.stun.twilio.com:3478',
          ],
        },
      ],
    });
  }

  ////////////////////////////메소드////////////////////////////

  // 상대방으로부터 받은 offer 정보를 통해 answer을 생성
  // 응답 받으면 리모트 세팅하고 답장 생성해서 로컬 세팅
  async getAnswer(
    offer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit> {
    if (this.peer) {
      // 상대방의 offer를 Remote Description으로 설정
      await this.peer.setRemoteDescription(offer);

      // answer 생성
      const ans = await this.peer.createAnswer();

      // 생성한 answer를 Local Description으로 설정
      // await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
    throw new Error('Peer가 초기화 되지 않았습니다');
  }

  // 상대방의 answer 정보를 설정
  async setRemoteDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  // 자신의 offer을 생성 및 설정
  // 오퍼를 원격 피어로 보낼 준비를 마침
  // 피어의 로컬 오퍼를 반환 => 시그널링 채널을 통해 원격 피어로 전송하여 연결을 협상
  async getOffer(): Promise<RTCSessionDescriptionInit> {
    if (this.peer) {
      // 자신의 offer를 생성
      const offer = await this.peer.createOffer();

      // 생성한 offer를 Local Description으로 설정
      // await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
    throw new Error('Peer가 초기화 되지 않았습니다');
  }
}

// Singleton 패턴을 사용하여 단 하나의 인스턴스를 공유
let peerService = new PeerService();
export default peerService;
