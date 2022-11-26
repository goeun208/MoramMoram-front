import React, {useRef, useState, useEffect} from "react";
import styles from "./CompanyApplication.module.css";
import effect from "../../assets/images/effect.svg";
import star from "../../assets/images/star.svg";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CompanyApplication = () => {
  
  const location = useLocation();
  const pr = location.state.applicationId;
  const navigate = useNavigate();
  const detailRef = useRef<HTMLDivElement>(null);
  const [appLists, setAppLists] = useState<any>(
    {
    "applicationId": 4,
    "marketId": 1,
    "userId": 2,
    "storeName": "모람상점",
    "onlineChannel": null,
    "returnAddress": null,
    "categoryId": 1,
    "category1": true,
    "category2": false,
    "category3": false,
    "category4": false,
    "subCategoryId": 1,
    "subCategory1": "가죽공예",
    "subCategory2": null,
    "subCategory3": null,
    "subCategory4": null,
    "subCategory5": null,
    "marketExp": true,
    "onlineExp": true,
    "light": true,
    "utensil": null,
    "certificateImg": null,
    "priceAvg": "1만원~2만원",
    "itemImg": null,
    "request": null,
    "createdAt": "2022-11-23T05:13:56",
    "updatedAt": "2022-11-23T05:13:56",
    "status": null,
		"userName": "육캔두잇"
}
);

  const getAppForm = () => {
    axios.get(`/applications/${pr}`)
      .then((res) => {
        if (res.data) {
          setAppLists(res.data);
          console.log(appLists);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onClickTr = () => {
   axios.post(`/applications/approved/${pr}`)
   .then((res) => {
    if(res.data.isSuccess){
      alert('수락되었습니다.');
      navigate('/fleamarket/apply/result');
    }
   })
  }

  useEffect(() => {
    detailRef.current?.scrollIntoView();
    // getAppForm();
    console.log(pr, 'pr');
    console.log(appLists, 'applists');

  }, []);
  

  return (
    appLists &&
    <div className={styles.app_wrap} ref={detailRef}>
      <div className={styles.app_title}>신청내역 확인<img src={effect} alt="*" /></div>
      
      <div className={styles.app_box}>
      <div>
            <div>
              <div className={styles.wrap}>
              <div className={styles.user_title}>{appLists.userName}님의 신청내역</div>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />브랜드/상점명</td>
                      <td className=''>{appLists.storeName}</td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />카테고리/세부카테고리</td>
                      <td className=''>{appLists.category1 && '공예'} <span className={styles.span_box}> <span>{appLists.subCategory1 && `#${appLists.subCategory1}`}</span>
                      <span>{appLists.subCategory2 && `#${appLists.subCategory2}`}</span></span> </td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />상품 평균 가격대</td>
                      <td className=''>{appLists.priceAvg}</td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />온라인 채널 주소</td>
                      <td className=''>{appLists.onlineChannel}</td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />반품 주소</td>
                      <td className=''>{appLists.returnAddress}</td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />플리마켓 참여 경험</td>
                      <td className=''>{appLists.marketExp ? 'O' : 'X'}</td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />온라인 판매 경험</td>
                      <td className=''>{appLists.onlineExp ? 'O' : 'X'}</td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />보유 집기</td>
                      <td className=''>{appLists.light && '조명'}</td>                    
                    </tr>
                    <tr>
                      <td className={styles.td_title}><img src={star} alt="*" />기타 요청 사항</td>
                      <td className=''>{appLists.request}</td>                    
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
         <div className={styles.btn_box}>
          <button onClick={onClickTr}>수락</button>
            <button onClick={onClickTr}>거절</button>
         </div>
            
            

            </div>
      </div>
    </div>
  )
}

export default CompanyApplication;