class PeerService {
  private peer: RTCPeerConnection;

  constructor() {
    // RTCPeerConnection 객체를 생성하여 peer 변수에 할당
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
  async getAnswer(
    offer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit> {
    if (this.peer) {
      // 상대방의 offer를 Remote Description으로 설정
      await this.peer.setRemoteDescription(offer);

      // answer 생성
      const ans = await this.peer.createAnswer();

      // 생성한 answer를 Local Description으로 설정
      await this.peer.setLocalDescription(ans);
      return ans;
    }
    throw new Error('Peer가 초기화 되지 않았습니다');
  }

  // 상대방의 answer 정보를 설정
  async setLocalDescription(ans: RTCSessionDescriptionInit): Promise<void> {
    if (this.peer) {
      // 상대방의 answer를 Remote Description으로 설정
      await this.peer.setRemoteDescription(ans);
    } else {
      throw new Error('Peer가 초기화 되지 않았습니다');
    }
  }

  // 자신의 offer을 생성
  async getOffer(): Promise<RTCSessionDescriptionInit> {
    if (this.peer) {
      // 자신의 offer를 생성
      const offer = await this.peer.createOffer();

      // 생성한 offer를 Local Description으로 설정
      await this.peer.setLocalDescription(offer);
      return offer;
    }
    throw new Error('Peer가 초기화 되지 않았습니다');
  }
}

// Singleton 패턴을 사용하여 단 하나의 인스턴스를 공유
const peerService = new PeerService();
export default peerService;
