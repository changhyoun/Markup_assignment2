import { useState, useEffect } from "react";
import "./Container.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faTimes } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";

const Container = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    gsap.to("#Container > div:nth-of-type(2)", {
      height: isExpanded ? "167px" : "30px",
      duration: 0.5,
      ease: "power1.out",
    });

    gsap.to(
      ["#Container > div:nth-of-type(2) div:nth-of-type(2)", "#Container > div:nth-of-type(2) div:nth-of-type(3)"],
      {
        opacity: isExpanded ? 1 : 0,
        display: isExpanded ? "" : "none",
        duration: 0.5,
        ease: "power1.out",
      }
    );
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);

    if (!isModalVisible) {
      gsap.fromTo(".modal", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  };

  // 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      // modal과 #Container 외부 클릭을 확인
      if (isModalVisible && !event.target.closest(".modal")) {
        setIsModalVisible(false);
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible]);

  return (
    <div id="Container">
      <div className="Co-top">
        <span className="material-symbols-outlined">local_shipping</span>
        <p>오늘 9/21(수) 출발 예정</p>
        <FontAwesomeIcon className="info modal_ic" icon={faCircleInfo} onClick={toggleModal} />

        {/* 모달 */}
        {isModalVisible && (
          <div className="modal">
            <div className="modal_inner">
              <h4>배송안내</h4>
              <ul>
                <li>출발일과 도착일은 판매자, 택배사, 기상상황 등에 따라<br />달라질 수 있습니다.</li>
                <li>판매 사정 또는 여러 상품을 함께 주문한 경우<br />출발 예정일이나 배송사가 변동될 수 있습니다.</li>
              </ul>              
              <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={toggleModal} />
            </div>  
          </div>
        )}
      </div>
      <div className="Co-bt">
        <div className="Co-bt_inner">
          <div className="Co-bt__t">
            <h3>9/23(금)까지 도착 확률 86%</h3>
            <div onClick={toggleExpand} style={{ cursor: "pointer" }}>
              {isExpanded ? "펼치기" : "접기"}
              <span className="material-symbols-outlined">
                {isExpanded ? "keyboard_arrow_down" : "keyboard_arrow_up"}
              </span>
            </div>
          </div>
          <div className="Co-bt__mi del">
            <div className="Co-bt__mi__fi">
              <p>9/22(목) 도착</p>
              <span></span>
              <p>76%</p>
            </div>
            <div className="Co-bt__mi__se">
              <p>9/23(금) 도착</p>
              <span></span>
              <p>86%</p>
            </div>
            <div className="Co-bt__mi__th">
              <p>9/24(토) 도착</p>
              <span></span>
              <p>26%</p>
            </div>
          </div>
          <div className="Co-bt__bt del">
            <p>배송 분석 시스템으로 예측되었습니다. <span>Beta</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
