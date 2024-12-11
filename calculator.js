// 버튼 요소 선택
const buttons = document.querySelectorAll('.button');
const display = document.getElementById('display');

// 초기값 설정
let firstOperand = null;  // 첫 번째 숫자
let secondOperand = null; // 두 번째 숫자
let currentOperator = null; // 연산자
let currentInput = '0'; // 디스플레이에 표시될 값
let isOperatorClicked = false; // 연산자가 클릭되었는지 확인

// 버튼 클릭 시 이벤트 리스너 추가
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent; // 버튼의 텍스트 값

        // 숫자 버튼 클릭 시 처리
        if (value >= '0' && value <= '9') {
            // 연산자가 클릭된 후에 숫자 입력 시, 두 번째 숫자 입력 시작
            if (isOperatorClicked) {
                currentInput = value; // 두 번째 숫자 입력
                isOperatorClicked = false; // 연산자 클릭 상태 해제
            } else {
                // 첫 번째 숫자 입력 중일 때
                currentInput = currentInput === '0' ? value : currentInput + value;
            }
        } 
        
        // 소수점 클릭 시 처리
        else if (value === '.') {
            // 소수점 중복 방지
            if (!currentInput.includes('.')) {
                currentInput += value;
            }
        } 
        
        // C 버튼 클릭 시 초기화
        else if (value === 'C') {
            currentInput = '0'; // 초기화
            firstOperand = null;
            secondOperand = null;
            currentOperator = null;
            isOperatorClicked = false;
        } 
        
        // ± 버튼 클릭 시 부호 바꾸기
        else if (value === '±') {
            currentInput = (parseFloat(currentInput) * -1).toString(); // 부호 바꾸기
        } 
        
        // % 버튼 클릭 시 퍼센트로 바꾸기
        else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString(); // 퍼센트로 계산
        } 
        
        // 연산자 버튼 클릭 시
        else if (['+', '-', 'x', '÷'].includes(value)) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput); // 첫 번째 숫자 저장
            } else if (secondOperand === null) {
                secondOperand = parseFloat(currentInput); // 두 번째 숫자 저장
            }
            currentOperator = value; // 연산자 저장
            isOperatorClicked = true; // 연산자가 클릭된 상태로 설정
            
        } 
        
        // = 버튼 클릭 시
        else if (value === '=') {
            if (firstOperand !== null && currentOperator !== null) {
                if (secondOperand === null) {
                    secondOperand = parseFloat(currentInput); // 두 번째 숫자가 없으면 현재 입력값을 두 번째 숫자로 설정
                }
                const result = calculate(firstOperand, currentOperator, secondOperand); // 계산 수행
                currentInput = result.toString(); // 계산 결과를 문자열로 변환
                firstOperand = result; // 결과를 첫 번째 값으로 설정
                secondOperand = null; // 두 번째 숫자는 초기화
                currentOperator = null; // 연산자 초기화
                isOperatorClicked = false; // 연산자 클릭 상태 해제
            }
        }

        // 디스플레이 업데이트
        display.textContent = currentInput;

        // 버튼 클릭 시 출력
        console.log(`First Operand:${firstOperand}, Operator: ${currentOperator}`);
    });
});

// 계산 함수
function calculate(first, operator, second) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case 'x':
            return first * second;
        case '÷':
            if (second !== 0) {
                return first / second;
            } else {
                return 'Err'; // 0으로 나눴을 때
            }
        default:
            return second;
    }
    console.log('firstOperand:', first);
    console.log('operand:', operator);
    console.log('secondtOperand:', second);
}
    