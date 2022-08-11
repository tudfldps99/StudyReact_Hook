// useMemo : 함수형 컴포넌트 내부에서 발생하는 연산 최적화 가능
// useCallback : 이벤트 핸들러 함수를 필요할 때만 생성 가능
// useRef : 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해줌

import React, { useState, useMemo, useCallback, useRef } from 'react';

const getAverage = numbers => {
    console.log('평균값 계산 중..');

    if (numbers.length === 0)
        return 0;
    
    const sum = numbers.reduce((a, b) => a + b);
    
    return sum / numbers.length;
};

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null);

    /*

    const onChange = e => {
        setNumber(e.target.value);
    };
    const onInsert = e => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    };

    */

    const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []);     // 컴포넌트가 처음 렌더링 될 때만 함수 생성
    const onInsert = useCallback(() => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        inputEl.current.focus();
    }, [number, list]);     // number 혹은 list가 바뀌었을 때만 함수 생성


    // 숫자를 등록할 때뿐만 아니라 인풋 내용이 수정될 때도 평균값을 다시 계산 (getAverage 함수 호출) -> 낭비
    // useMemo Hook 사용하면 작업 최적화 가능
    const avg = useMemo(() => getAverage(list), [list]);

    // useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킴
    return (
        <div>
            <input value={number} onChange={onChange} ref={inputEl} />   
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b> {avg}
            </div>
        </div>
    );
};

export default Average;