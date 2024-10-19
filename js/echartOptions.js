var options = {
    line: {
        color: ['#3163C2', '#DA4516'],
        title: false,
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // 툴팁 배경색상 설정
            textStyle: {
                color: '#fff', // 툴팁 글씨색상 설정
                fontFamily: 'Pretendard',
                fontSize: 12,
                fontWeight: '600'
            },
            borderWidth: 0,
            formatter: function(params) {
                // c 값을 세 자리마다 쉼표를 넣어 반환
                var value = params.value.toLocaleString();
                return `${params.name} - ${value}건`;
            }
        },
        legend: {
            data: ['경영계획', '실적'],
            textStyle: {
                color: '#b2bbce',
                fontFamily: 'Pretendard',
            },
            bottom: '0%', // 범례를 제목 아래로
            show: false,
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '5%',
            containLabel: true,
            top: '6%', // 그래프 영역을 아래로 이동
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['10/1', '10/2', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7', '10/8', '10/9', '10/10'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#d1d1d1'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 11,
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    color: '#7E7E7E'
                },
                interval: 0,
            },
            axisTick: {
                show: false // x축의 작은 세로선 숨기기
            }
        },
        yAxis: {
            type: 'value',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#d1d1d1',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#d1d1d1'
                },
            },
            axisLabel: {
                textStyle: {
                    fontSize: 11,
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    color: '#7E7E7E'
                }
            },
            min: 0,
            max: 20000000,
            interval: 5000000,
        },
        series: [
            {
                name: "경영계획",
                type: "line",
                symbol: 'circle',
                symbolSize: 7,
                data: [12500000, 12500000, 8000000, 18000000, 12500000, 6000000, 12500000, 6000000, 10000000, 13000000, 10000000]
            },
            {
                name: "실적",
                type: "line",
                symbol: 'circle',
                symbolSize: 7,
                data: [9000000, 6000000, 5800000, 5500000, 5000000, 5500000, 5800000, 5000000, 6000000, 7000000, 7000000]
            },
        ]
    },
    
    doughnut1: {
        color: ['#204489', '#36C080', '#5ACFB4'],
        title: {
            show: false,
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // 툴팁 배경색상 설정
            textStyle: {
                color: '#fff', // 툴팁 글씨색상 설정
                fontFamily: 'Pretendard',
                fontSize: 12,
                fontWeight: '600'
            },
            borderWidth: 0,
            formatter: '{b} {c}%'
        },
        legend: {
            itemWidth: 16, // 아이템 너비
            itemHeight: 8, // 아이템 높이
            data: ['교환권', '금액권', '할인권'],
            textStyle: {
                color: '#3F4A53',
                fontFamily: 'Pretendard',
            },
            top: '40%', // 범례를 제목 아래로
            right: '10%',   // 오른쪽에 배치
            orient: 'vertical', // 세로 방향으로 변경
            itemGap: 1,
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                center: ['40%', '50%'],
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 15, name: '교환권' },
                    { value: 30, name: '금액권' },
                    { value: 55, name: '할인권' }
                ]
            }
        ]
    },
    doughnut2: {
        color: ['#204489', '#3163C2', '#5B8DD9', '#36C080', '#91CAF4', '#36C080', '#5ACFB4', '#78D2A1', '#FEC140', '#DA4516', '#AC2A35'],
        title: {
            show: false,
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // 툴팁 배경색상 설정
            textStyle: {
                color: '#fff', // 툴팁 글씨색상 설정
                fontFamily: 'Pretendard',
                fontSize: 12,
                fontWeight: '600'
            },
            borderWidth: 0,
            formatter: '{b} {c}%'
        },
        legend: {
            itemWidth: 16, // 아이템 너비
            itemHeight: 8, // 아이템 높이
            data: ['판매지사1', '판매지사2', '판매지사3', '판매지사4', '판매지사5', '판매지사6', '판매지사7', '판매지사8', '판매지사9', '판매지사10', '기타'],
            textStyle: {
                color: '#3F4A53',
                fontFamily: 'Pretendard',
            },
            top: '15%', // 범례를 제목 아래로
            right: '10%',   // 오른쪽에 배치
            orient: 'vertical', // 세로 방향으로 변경
            itemGap: 1,
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                center: ['40%', '50%'],
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 9, name: '판매지사1' },
                    { value: 9, name: '판매지사2' },
                    { value: 9, name: '판매지사3' },
                    { value: 9, name: '판매지사4' },
                    { value: 9, name: '판매지사5' },
                    { value: 9, name: '판매지사6' },
                    { value: 9, name: '판매지사7' },
                    { value: 9, name: '판매지사8' },
                    { value: 9, name: '판매지사9' },
                    { value: 9, name: '판매지사10' },
                    { value: 9, name: '기타' },
                ]
            }
        ]
    },

    barStack: {
        color: ['#204489', '#36C080'],
        title: {
            text: '월별 교통사고 현황',
            textStyle: {
                fontSize: 14,
                color: '#b2bbce',
                fontFamily: 'Pretendard',
            },
            left: 'center',
            show: false,
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // 툴팁 배경색상 설정
            textStyle: {
                color: '#fff', // 툴팁 글씨색상 설정
                fontFamily: 'Pretendard',
                fontSize: 12,
                fontWeight: '600'
            },
            borderWidth: 0,
            formatter: '{a} 사고 {b} {c}건'
        },
        legend: {
            itemWidth: 16, // 아이템 너비
            itemHeight: 8, // 아이템 높이
            data: ['사용', '미사용'],
            textStyle: {
                color: '#3F4A53',
                fontFamily: 'Pretendard',
            },
            top: '0%', // 범례를 제목 아래로
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '3%',
            containLabel: true,
            top: '10%', // 그래프 영역을 아래로 이동
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['07/16', '07/17', '07/18', '07/19', '07/20', '07/21', '07/22', '07/23', '07/24', '07/25', '07/26', '07/27', '07/28', '07/29', '07/30', '07/31', '08/01', '08/02', '08/03', '08/04', '08/05', '08/06', '08/07', '08/08', '08/09', '08/10', '08/11', '08/12', '08/13', '08/14'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#E3E5E9'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 11,
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    color: '#7e7e7e'
                },
                interval: 0,
            },
            axisTick: {
                show: false // x축의 작은 세로선 숨기기
            }
        },
        yAxis: {
            type: 'value',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#E3E5E9',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#E3E5E9'
                },
            },
            axisLabel: {
                textStyle: {
                    fontSize: 11,
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    color: '#7E7E7E'
                }
            },
            min: 0,
            max: 14000,
            interval: 2000,
        },
        series: [
            {
                name: "사용",
                type: "bar",
                barWidth: '40%',
                stack: "total",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                data: [8000, 4000, 7900, 5400, 2000, 2000, 8000, 4000, 8000, 5400, 2000, 2000, 8000, 4000, 7900, 5400, 2000, 2000, 8000, 4000, 8000, 5400, 2000, 2000, 8000, 4000, 8000, 5400, 2000, 2000]
            },
            {
                name: "미사용",
                type: "bar",
                barWidth: '40%',
                stack: "total",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                data: [2000, 2000, 2000, 2000, 1000, 1000, 2000, 2000, 2000, 2000, 2000, 1000, 2000, 2000, 2000, 2000, 1000, 1000, 2000, 2000, 2000, 2000, 2000, 1000, 2000, 2000, 2000, 2000, 2000, 1000]
            },
        ]
    },
}