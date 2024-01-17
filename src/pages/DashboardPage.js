import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import moment from 'moment';
import { PieGetApi } from '../api/dashboard/sales/PieGetApi';
import MyCalendar from '../components/dashboard/MyCalendar';
import { LineGetApi } from '../api/dashboard/sales/LineGetApi';

/* eslint-disable */

// 컴포넌트 전체 영역
const ComponentDiv = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 맨 위 글자 영역
const TitleDiv = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 60%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 80%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;

// 달력, 타입 영역
const CalendarTypeDiv = styled.div`
  width: 100%;  
  height: 5%;
  display: flex;
  align-items: flex-start;
  justify-content: start;
`;

// 달력 컨테이너
const CalendarContainer = styled.div`
  width: 20%;
  height : 70%;
  margin-right: 10%;
  margin-left: 5%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -0.7%;
`;

// 대시보드 타입 영역
const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 30%;

`;

// 대시보드 타입 버튼
const TypeButton = styled.button`
  border: none;
  border-bottom: 2px solid #1C395E;
  width: 50%;
  height: 100%;
  font-family: Pretendard-Regular;
  font-size: 85%;
  background-color: ${({ active }) => (active ? "#00ADEF" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#1C395E")};
  cursor: pointer;

  // 반응형에 맞게 폰트 크기 조정
  @media screen and (max-width: 768px) {
    font-size: 60%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 80%;
  }
  @media screen and (min-width: 1025px) {
    font-size: 100%;
  }
`;

// 대시보드 영역
const DashboardDiv = styled.div`
  height: 80%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

// 파이 컨테이너
const PieContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  // 마우스 포인터 버그 해결을 위해 포인터 이벤트 비활성화
  pointer-events: none;
`;


// 라인 컨테이너
const LineContainer = styled.div`
  margin-top: -5%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  // 마우스 포인터 버그 해결을 위해 포인터 이벤트 비활성화
  pointer-events: none;
`;

// 컨설팅 컨테이너
const ConsultContainer = styled.div`
  height: 5%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DashboardPage() {

  // default 오늘 날짜
  const today = moment().format("YYYY-MM-DD");

  // calendar용 날짜 상태 저장
  const [date, setDate] = useState(today);

  // 변경된 날짜 이벤트 핸들러
  const handlerDateChange = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
  };

  // 대시보드 타입 상태 저장
  const [selectedDashboardType, setSelectedDashboardType] = useState('매출');


  // 파이 데이터 상태 저장
  const [pieData, setPieData] = useState([]);

  
  // 차트(파이) 데이터 상태 저장
  const [chartData, setChartData] = useState([]);


  // 라인 데이터 상태저장
  const [lineData, setLineData] = useState([]);

  
  // 그래프(라인) 데이터 상태 저장
  const [graphData, setGraphData] = useState([]);
  

  // 버튼 클릭 시 실행할 함수
  const handlerButtonClick = (e) => {
    setSelectedDashboardType(e);
  };

  // Chart.js에 GET으로 가져온 데이터 보여주기
  useEffect(() => {
    async function fetchData() {
      try {
        const pieData = await PieGetApi(date);
        setPieData(pieData?.items || []);
  
        // 기본적인 데이터 매핑
        const chartData = pieData?.items.map((item) => ({
          name: `${item.name}`,
          value: selectedDashboardType === '매출' ? item.sales_volume : item.profit,
        })) || [];
  
        // 백분율이 5% 미만인 데이터를 '기타'로 합치기
        const totalPercent = chartData.reduce((total, entry) => total + entry.value, 0);
        const filteredData = chartData.filter(entry => (entry.value / totalPercent) * 100 >= 5);
        
        if (chartData.length > filteredData.length) {
          const otherData = {
            name: '기타',
            value: totalPercent - filteredData.reduce((total, entry) => total + entry.value, 0),
          };
          setChartData([...filteredData, otherData]);
        } else {
          setChartData(filteredData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [date, selectedDashboardType]);



  useEffect(() => {
    async function fetchData() {
      try {
        const lineData = await LineGetApi(date);
        setLineData(lineData?.total || []);

        const graphData = lineData?.total.map((item) => ({
          date: item.date,
          value: selectedDashboardType === '매출' ? item.sales_volume : item.profit,
        })) || [];
        setGraphData(graphData);  
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [date, selectedDashboardType]);

// 원형 차트 데이터 색깔
const customColors = [
  '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
  '#feef1f', '#27ae60', '#1cffca', '#1abc9c', '#d35400',
  '#34495e', '#c0392b', '#7f8c8d', '#16a085', '#e74c68'
  ];

// 원형 차트 기타 색깔
const otherColor = 'white'; // 검은색
 
const customLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  // const로 선언하면 안 됨
  let delta = Math.abs(1 / cos) + 10;

  // 12시 방향(위) 가지 세로 길이 줄임
  // if (midAngle > 70 && midAngle < 87) {
  //   delta = Math.abs(1 / cos) + 10;
  // };

  // if (midAngle > 93 && midAngle < 115) {
  //   delta = Math.abs(1 / cos) + 10;
  // };

  if (midAngle > 87 && midAngle < 93) {
    delta = Math.abs(1 / cos) -50;
  };

  // 6시 방향(아래) 가지 세로 길이 줄임
  // if (midAngle > 260 && midAngle < 280) {
  //   delta = Math.abs(1 / cos);
  // };

  // if (midAngle > 260 && midAngle < 280) {
  //   delta = Math.abs(1 / cos);
  // };

  // if (midAngle > 267 && midAngle < 280) {
  //   delta = Math.abs(1 / cos) + 10;
  // };

  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + delta) * cos;
  const my = cy + (outerRadius + delta) * sin;
  const ex = mx + Number(cos.toFixed(1)) * 20;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke='black'
        fill="none"
      />
      <rect x={ex + (cos >= 0 ? 1 * 5 : -1 * 17)} y={ey - 4} width={12} height={8} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 21}
        y={ey + 4}
        textAnchor={textAnchor}
      >
        {`${payload.name} ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

  return (
    <ComponentDiv>
      <TitleDiv>
        <h1>대시보드</h1>
      </TitleDiv>
      <CalendarTypeDiv>
        <CalendarContainer>
          <MyCalendar date={date} onDateChange={handlerDateChange}/>
        </CalendarContainer>
        <TypeContainer>
          <TypeButton
            active={selectedDashboardType === '매출'}
            onClick={() => handlerButtonClick('매출')}
          >
            매출
          </TypeButton>
          <TypeButton
            active={selectedDashboardType === '순이익'}
            onClick={() => handlerButtonClick('순이익')}
          >
            순이익
          </TypeButton>
        </TypeContainer>
      </CalendarTypeDiv>
      <DashboardDiv>
        <PieContainer>
          {chartData.length > 0 && (
            <PieChart width={1400} height={400} cursor="none">
              <Pie
                dataKey="value"
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#8884d8"
                label={customLabel}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === '기타' ? otherColor : customColors[index % customColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
        </PieContainer>
        <LineContainer>
          {graphData.length > 0 && (
            <LineChart width={1000} height={300} data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value / 1000}만`} />
              <Legend wrapperStyle={{ fontSize: '150%' }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name={selectedDashboardType === '매출' ? '매출' : '순이익'}
              />
            </LineChart>
          )}
        </LineContainer>
        <ConsultContainer>
          <h1>컨설팅</h1>
        </ConsultContainer>
      </DashboardDiv>
    </ComponentDiv>
  );
};

export default DashboardPage;