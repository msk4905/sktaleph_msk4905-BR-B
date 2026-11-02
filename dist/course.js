'use strict';
const COURSE=[
  {
    "title": "고칠 부분과 남길 정보 정하기",
    "phase": "시작 · 문서 수정",
    "question": "글을 줄이면서 어떤 정보는 그대로 남겨야 할까요?",
    "caseIndex": 0,
    "lesson": [
      "AI에게 보낼 요청을 프롬프트라고 합니다. “이 안내문을 짧게 고쳐 줘”라고 쓰기 전에, 무엇을 바꾸고 어떤 정보는 남길지 정하세요. 글의 길이는 바꿔도 날짜나 금액은 바뀌면 안 되는 작업이 있습니다.",
      "조건은 받은 답과 대조할 수 있게 적습니다. “잘 정리해 줘”보다 “본문을 두 문장으로 줄이고, 마감일과 금액은 그대로 적어 줘”라고 하면 확인할 대상이 분명해집니다. 두 문장이라는 형식이 실제 사용 목적에 맞는지도 살펴보세요.",
      "요청한 형식과 보존할 정보는 따로 확인합니다. 두 문장으로 썼어도 날짜가 달라졌다면 요청을 지킨 답이 아닙니다. 정한 조건을 모두 담아 지시문을 작성한 뒤, 예시나 빈 틀이 필요한지 판단합니다."
    ],
    "task": "단체 채팅방에 올릴 안내문을 두 문장으로 줄이려고 합니다. 마감일·참가비·신청 방법은 그대로 남겨야 합니다.\n\n원문\n독서 행사 신청을 받습니다. 신청 마감은 11월 7일입니다. 참가비는 5,000원입니다. 신청은 학교 게시판 댓글로 받습니다.\n\n1. 바꿀 부분과 남길 정보를 구분하세요.\n2. AI에게 보낼 프롬프트를 쓰세요. 지시만 쓸지, 예시나 빈 틀을 더할지 정하고 이유를 적으세요.\n3. 받은 답에서 문장 수와 세 정보를 각각 어떻게 확인할지 적으세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "본문을 두 문장으로 줄이되, 마감일·참가비·신청 방법을 보존하도록 요청했나요?",
      "지시·예시·빈 틀 중 선택한 방법이 이 작업에 맞는 이유를 적었나요?",
      "문장 수는 세어 보고, 세 정보는 원문과 대조하도록 했나요?"
    ],
    "example": "“다음 안내문을 본문 두 문장으로 줄여 줘. 마감일 11월 7일, 참가비 5,000원, 신청 방법인 학교 게시판 댓글은 그대로 남겨 줘. 제목은 붙이지 마.”라고 적고 원문을 붙일 수 있습니다. 지시만으로 먼저 요청하고, 받은 답에서 문장 수와 세 정보를 각각 확인합니다. 예를 들어 “독서 행사 신청은 11월 7일까지 학교 게시판 댓글로 받습니다. 참가비는 5,000원입니다.”라면 조건을 모두 지켰습니다.",
    "extra": "한 문장으로 줄여야 한다면 세 정보를 모두 담을 수 있을까요? 가능한 수정안을 먼저 써 보세요.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“짧고 자연스럽게 고쳐 줘.”",
        "reason": "줄일 길이와 보존할 정보가 빠져 있습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“두 문장으로 고쳐 줘. 날짜와 금액은 유지해 줘.”",
        "reason": "신청 방법도 남겨야 합니다. 요청과 검사 항목에 함께 넣어 주세요."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  },
  {
    "title": "지시·예시·빈 틀 중 고르기",
    "phase": "선택 · 업무 인수인계",
    "question": "원하는 배치를 보여 주려면 무엇을 더하면 좋을까요?",
    "caseIndex": 3,
    "lesson": [
      "지시는 해야 할 일을 설명하고, 완성 예시는 원하는 결과의 모습을 보여 줍니다. 빈 틀은 내용이 들어갈 자리를 보여 줍니다. 예를 들어 “완료한 일 → 남은 일”이라는 순서를 설명할 수도 있고, 두 소제목을 놓은 틀을 줄 수도 있습니다.",
      "먼저 받은 답에서 무엇이 문제인지 찾으세요. 순서가 자꾸 바뀐다면 그 순서를 보여 주는 빈 틀을 시도할 수 있습니다. 특정한 말투나 표현을 보여 주고 싶다면 그 조건을 지킨 완성 예시를 쓸 수 있습니다.",
      "논문에서는 완성 예시뿐 아니라 내용을 비운 틀에서도 형식 조건의 준수율이 개선된 경우가 있었습니다. 예시의 내용과 구조를 나누어 생각할 수 있는 결과입니다. 아래 비교 자료를 읽고, 내 작업에서는 무엇을 보여 줄지 정하세요."
    ],
    "task": "동료에게 넘길 업무 메모를 정리합니다.\n\n원자료: 자료 수집은 끝났고, 표 검토는 남아 있습니다. 표 검토 마감은 11월 9일입니다.\n요구사항: “완료한 일” 다음에 “남은 일”을 쓰고, 날짜를 유지합니다.\n현재 문제: 날짜는 맞지만 두 소제목의 순서가 자주 바뀝니다.\n\n1. 지시를 유지할지, 완성 예시나 빈 틀을 더할지 고르세요.\n2. 선택한 방법으로 프롬프트를 작성하세요.\n3. 다음 응답에서 소제목 순서와 날짜를 확인하는 방법을 적으세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "날짜보다 소제목 순서가 현재 문제라는 점을 짚었나요?",
      "선택한 방법에 맞춰 두 소제목의 순서를 보여 주거나 명확히 설명했나요?",
      "받은 답에서 순서와 11월 9일을 각각 확인하도록 했나요?"
    ],
    "example": "같은 지시에 “완료한 일\n[완료 내용]\n\n남은 일\n[남은 내용과 마감일]”이라는 빈 틀을 붙여 볼 수 있습니다. 내용이 없는 틀로 소제목 순서를 보여 주는 방법입니다. 원자료도 함께 넣고, 응답에서 소제목 순서와 11월 9일이 유지됐는지 확인합니다. 완성 예시를 선택했다면 원자료와 혼동하지 않도록 예시를 구분해야 합니다.",
    "extra": "이미 지시만으로 순서와 날짜를 잘 지키고 있다면 같은 빈 틀을 더할 이유가 있을까요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“다른 업무 메모를 아무거나 예시로 붙입니다.”",
        "reason": "필요한 소제목 순서를 보여 주는지 먼저 확인해야 합니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“빈 틀을 붙여 순서를 보여 줍니다.”",
        "reason": "틀을 직접 쓰고, 원자료와 날짜를 전달하는 지시도 포함해야 합니다."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  },
  {
    "title": "요청과 예시가 충돌하는지 살피기",
    "phase": "점검 · 고객 안내",
    "question": "예시를 따라 쓰면 원래 요청도 지킬 수 있을까요?",
    "caseIndex": 4,
    "lesson": [
      "완성 예시는 읽기 좋더라도 현재 요청과 다를 수 있습니다. 해요체를 요구하면서 합니다체 예시를 붙이거나, 원문에 없는 약속을 예시에서 보여 주면 무엇을 따라야 할지 엇갈립니다.",
      "논문에서는 지시와 예시의 말투가 충돌할 때 모델별로 다른 결과가 나타났습니다. 예시를 붙이기 전에 요청과 대조하고, 충돌하는 부분은 고치거나 빼세요. 이미 맞는 구조까지 전부 바꿀 필요는 없습니다.",
      "요청 자체의 모순도 구분해야 합니다. “두 문장으로 써 줘”와 “세 문장을 각각 그대로 유지해 줘”는 함께 지킬 수 없습니다. 이런 경우에는 예시를 고치기 전에 어느 조건을 우선할지 확인합니다."
    ],
    "task": "배송 안내를 해요체 두 문장으로 쓰려 합니다. 원문에 없는 배송일이나 보상은 약속하면 안 됩니다.\n\n원자료: 주문 A-17은 배송이 지연됐습니다. 도착 예정일은 정해지지 않았습니다.\n붙이려는 예시: “배송이 늦어졌습니다. 내일 도착합니다.”\n\n1. 예시에서 요청과 충돌하는 부분을 찾으세요.\n2. 두 문장 구조는 유지하면서 예시를 고치세요.\n3. 고친 예시를 사용한 뒤, 응답에서 무엇을 확인할지 적으세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "합니다체와 근거 없는 “내일 도착”이라는 약속을 모두 찾았나요?",
      "두 문장 구조를 유지하면서 해요체로 바꾸고 도착일을 단정하지 않았나요?",
      "다음 응답에서도 문장 수·말투·도착일 표현을 확인하도록 했나요?"
    ],
    "example": "“배송이 늦어졌어요. 도착 예정일은 아직 정해지지 않았어요.”로 고칠 수 있습니다. 두 문장 구조는 유지하고, 합니다체와 근거 없는 약속만 고쳤습니다. AI가 새로 만든 응답에서도 이 세 조건을 확인해야 합니다.",
    "extra": "“세 문장은 한 글자도 바꾸지 말고 두 문장으로 합쳐 줘”라는 요청을 받았다면, 작업 전에 무엇을 확인하겠나요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“배송이 늦어졌어요. 내일 도착해요.”",
        "reason": "말투는 고쳤지만 원자료에 없는 도착일을 여전히 약속하고 있습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“도착 예정일은 아직 정해지지 않았어요.”",
        "reason": "내용은 맞지만 두 문장이라는 조건을 놓쳤습니다."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  },
  {
    "title": "보기 좋은 답과 조건을 지킨 답 구분하기",
    "phase": "검사 · 자료 정리",
    "question": "표 모양이 맞으면 자료도 정확하게 옮겨졌을까요?",
    "caseIndex": 2,
    "lesson": [
      "표나 목록은 모양이 맞아도 값이 바뀌거나 항목이 빠질 수 있습니다. 열과 행을 확인한 뒤, 각 값도 원자료와 대조하세요. 빈칸을 그럴듯한 값으로 채우지 말라는 조건이 있다면 누락된 정보의 처리도 검사합니다.",
      "검사 기준은 비교 전에 정합니다. 표의 제목 줄인 머리글과 구분선은 자료 행 수에 넣지 않습니다. 빈칸은 어떤 표시로 남길지 정하고, 두 응답에 같은 기준을 적용합니다.",
      "자동 검사도 틀릴 수 있습니다. 논문 응답을 비교하는 화면에서는 원논문의 채점과 앱의 판정을 함께 볼 수 있습니다. 숫자가 다르면 먼저 응답과 판정 기준을 대조하세요."
    ],
    "task": "물품 메모를 “품목 | 수량” 두 열의 표로 옮깁니다. 세 품목을 모두 넣고, 수량이 없는 항목은 “미확인”으로 적어야 합니다.\n\n원자료: 펜 2개, 공책은 수량 없음, 파일 3개.\n받은 표:\n| 품목 | 수량 |\n| --- | --- |\n| 펜 | 2개 |\n| 공책 | 1개 |\n| 파일 | 3개 |\n\n1. 두 열인지, 세 품목이 있는지, 수량을 원자료대로 옮겼는지 각각 판단하세요.\n2. 틀린 부분만 고친 표를 쓰세요.\n3. 같은 작업의 다른 응답에도 적용할 검사 기준을 적으세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "두 열과 세 품목은 맞고, 공책 수량은 틀렸다고 구분했나요?",
      "공책 수량만 “미확인”으로 고치고 나머지는 유지했나요?",
      "머리글·구분선을 제외해 행을 세고, 각 값을 원자료와 대조하도록 했나요?"
    ],
    "example": "두 열과 세 품목은 맞습니다. 공책의 수량 1개는 원자료에 없으므로 “미확인”으로 고칩니다. 다른 응답도 자료 행 수를 같은 방식으로 세고, 수량을 원자료와 대조합니다. 표 모양만 검사해서는 이 오류를 찾을 수 없습니다.",
    "extra": "자동 검사가 머리글까지 세어 네 품목이라고 했다면, 처음 판정과 수정한 판정을 어떻게 기록하겠나요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“세 행의 표이므로 모두 맞습니다.”",
        "reason": "공책 수량이 원자료에 없는 값이라는 점을 놓쳤습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“공책의 1개를 삭제합니다.”",
        "reason": "빈칸 대신 “미확인”으로 적으라는 조건을 따라야 합니다."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  },
  {
    "title": "전달 방식 하나만 바꿔 비교하기",
    "phase": "비교 · 진행 보고",
    "question": "빈 틀을 더한 효과를 어떻게 구분할까요?",
    "caseIndex": 3,
    "lesson": [
      "프롬프트를 고친 뒤 응답이 좋아졌어도 여러 요소를 함께 바꿨다면 무엇이 영향을 줬는지 구분하기 어렵습니다. 빈 틀의 영향을 보려면 같은 지시에 틀만 더하거나 빼서 비교하세요.",
      "원자료, 지켜야 할 조건, 모델, 출력 길이 같은 설정은 같게 둡니다. 한쪽에는 더 쉬운 자료를 주거나 실행을 더 많이 하면 비교가 달라집니다. 각 방식으로 여러 번 요청하고, 순서도 번갈아 배치합니다.",
      "논문은 조건별 응답을 모아 준수율을 비교했습니다. 아래 원자료에서 지시만 쓴 방식과 빈 틀을 더한 방식의 전체 결과를 살펴보세요. 내 실험에서는 원래 요청·응답·오류를 모두 남겨 비교합니다."
    ],
    "task": "진행 보고를 “완료 / 진행 중 / 막힌 일” 순서로 정리하려고 합니다. 빈 틀이 순서를 지키는 데 도움이 되는지 비교합니다.\n\n현재 계획\nA: 모델 X, 지시만 사용, 짧은 원자료, 1회 실행.\nB: 모델 Y, 빈 틀 추가, 긴 원자료, 5회 실행.\n\n1. 비교를 어렵게 만드는 차이를 찾으세요.\n2. 같은 원자료와 모델을 사용하는 A·B 요청을 쓰세요. B에는 같은 지시에 빈 틀만 더하세요.\n3. 각 방식의 실행 횟수·순서와 응답·오류 기록 방법을 정하세요. 실제 실행은 추가 활동입니다.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "모델·원자료·실행 횟수 차이를 찾고 두 방식에서 같게 맞췄나요?",
      "A의 지시를 B에도 그대로 쓰고, B에만 세 소제목의 빈 틀을 더했나요?",
      "각 방식의 반복 횟수·실행 순서·응답과 오류의 기록 방법을 정했나요?"
    ],
    "example": "같은 모델과 원자료로 각각 다섯 번 실행하고 A와 B를 번갈아 요청할 수 있습니다. A는 “완료, 진행 중, 막힌 일 순서로 정리해 줘”라는 지시를 쓰고, B는 같은 지시 뒤에 세 소제목과 빈 내용 칸을 더합니다. 모델 설정과 검사 기준도 같게 두고, 매 실행의 원문 응답과 오류를 남깁니다. 다섯 번은 연습 계획이며 그 횟수만으로 결과가 확정되는 것은 아닙니다.",
    "extra": "‘나의 실험’에서 문단 수와 말투를 정해 세 방식을 비교해 보세요. 날짜나 내용 보존은 받은 응답을 읽고 직접 확인하세요.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“모델 Y의 답이 더 좋으면 빈 틀을 씁니다.”",
        "reason": "모델과 원자료가 다르므로 빈 틀의 영향을 구분할 수 없습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“같은 모델에 A는 한 번, B는 다섯 번 요청합니다.”",
        "reason": "두 방식의 실행 횟수를 같게 정하고, 모든 응답과 오류를 남겨야 합니다."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  },
  {
    "title": "평균 점수와 작업 실패 함께 보기",
    "phase": "판단 · 결과 해석",
    "question": "평균이 같아도 바로 쓸 수 있는 답의 수는 같을까요?",
    "caseIndex": 5,
    "lesson": [
      "조건을 잘 지킨 정도를 볼 때는 두 비율을 구분합니다. “평균 규칙 준수율”은 전체 조건 검사 중 통과한 비율입니다. “모든 조건을 지킨 응답의 비율”은 받은 응답 중 모든 검사를 통과한 응답의 비율입니다.",
      "평균이 같아도 실패가 몰리는 위치는 다를 수 있습니다. 어떤 방식은 모든 답에서 하나씩 틀리고, 다른 방식은 일부 답만 모두 맞을 수 있습니다. 날짜처럼 반드시 보존해야 할 조건이 있다면 그 조건의 실패도 따로 확인하세요.",
      "논문에서는 모델과 조건에 따라 결과가 달랐습니다. 한 모델의 평균이나 응답 한 쌍만으로 다른 작업의 결과를 정하지 마세요. 내가 맡길 작업에서 어떤 조건을 놓쳤는지 함께 보고 다음 비교를 결정합니다."
    ],
    "task": "안내문 수정에서 네 조건을 검사했습니다. ① 두 문장 ② 해요체 ③ 마감일 유지 ④ 금액 유지입니다.\n\nA: 응답 5개가 각각 4개, 3개, 3개, 2개, 4개 조건을 지켰습니다.\nB: 응답 5개가 각각 4개, 4개, 4개, 2개, 2개 조건을 지켰습니다.\n추가 기록: A는 다섯 응답 모두 마감일을 지켰고, B는 두 응답에서 마감일을 바꿨습니다.\n\n1. 각 방식의 평균 규칙 준수율과 모든 조건을 지킨 응답의 비율을 계산하세요.\n2. 마감일 변경을 특히 피해야 한다면, 두 결과에서 무엇을 주의해서 보겠나요?\n3. 한 번의 비교를 넘어 확인할 내용을 한 가지 적으세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "A와 B의 전체 조건 검사 횟수를 각각 20회로 계산했나요?",
      "두 방식의 평균 준수율과 모든 조건을 지킨 응답의 비율을 구분했나요?",
      "B의 마감일 오류를 별도로 짚고, 다음 비교에서 확인할 내용을 적었나요?"
    ],
    "example": "A와 B는 각각 20번의 검사 중 16번을 통과해 평균 규칙 준수율이 80%입니다. 모든 조건을 지킨 응답은 A가 2/5=40%, B가 3/5=60%입니다. B는 완전히 맞는 응답이 더 많지만 마감일을 두 번 바꿨습니다. 날짜 변경을 피해야 하는 작업에서는 이 오류를 따로 봐야 합니다. 같은 작업의 다른 원자료로도 반복해 확인할 수 있습니다.",
    "extra": "응답을 받지 못한 오류가 한 번 더 있었다면 시도 횟수와 응답 기준 비율을 어떻게 구분하겠나요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“평균이 80%로 같으므로 두 방식은 같습니다.”",
        "reason": "모든 조건을 지킨 응답 수와 마감일 오류가 다릅니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“B는 60%이므로 무조건 B가 낫습니다.”",
        "reason": "모든 조건을 지킨 응답의 비율은 높지만 중요한 마감일 오류도 살펴야 합니다."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  },
  {
    "title": "새 자료에 맞게 요청 구성하기",
    "phase": "적용 · 회의 메모",
    "question": "예시를 빌려 쓰면서 원자료는 어떻게 지킬까요?",
    "caseIndex": null,
    "lesson": [
      "새로운 자료를 받으면 먼저 결과에 남길 항목과 없는 정보의 처리 방법을 정하세요. 회의 메모를 표로 바꾼다면 할 일·담당·기한을 열로 삼을 수 있습니다.",
      "완성 예시의 이름이나 날짜는 현재 자료의 사실이 아닙니다. 예시를 사용할 때는 어느 부분을 따라야 하는지 구분하고, 현재 원자료의 값을 옮기도록 요청하세요. 내용 없는 빈 틀로 필요한 열만 보여 주는 방법도 있습니다.",
      "이번에는 요청 작성부터 응답 검사까지 이어서 해 봅니다. 선택한 방법으로 프롬프트를 쓰고, 준비된 응답을 같은 조건으로 검사한 뒤 어긴 부분만 고치세요."
    ],
    "task": "회의 메모를 “할 일 | 담당 | 기한” 세 열의 표로 바꿉니다.\n\n원자료\n자료 정리 — 민지 — 11월 8일\n일정 확인 — 준호 — 기한 미정\n\n조건: 두 할 일을 모두 적고 이름·날짜를 유지합니다. 정해지지 않은 기한은 “미정”으로 적습니다.\n\n1. 지시·완성 예시·빈 틀 중 하나를 골라 프롬프트를 쓰고 이유를 적으세요.\n2. 아래 연습 응답을 조건별로 검사하세요.\n3. 틀린 부분만 고친 표를 답안에 쓰고, 다음 응답의 검사 방법을 적으세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "세 열과 두 할 일, 이름·날짜 보존, 미정 처리 방법을 프롬프트에 담았나요?",
      "각 이름과 기한을 원자료에 대조하고, 다른 값이 있다면 그 부분만 고쳤나요?",
      "선택한 전달 방식의 이유와 새 응답을 원자료에 대조할 방법을 적었나요?"
    ],
    "example": "“다음 메모를 할 일/담당/기한 세 열의 표로 옮겨 줘. 두 할 일을 모두 넣고 이름과 날짜를 그대로 유지해 줘. 없는 기한은 미정으로 적어 줘.”라는 지시에 원자료를 붙일 수 있습니다. 표 배치를 보여 주려면 같은 지시에 빈 표를 더합니다. 연습 응답의 민수는 민지로, 11월 9일은 미정으로 고치고 다른 값은 유지합니다.",
    "extra": "현재 자료의 이름과 날짜를 다른 값으로 바꿔 한 번 더 요청한다면, 예시의 값이 섞였는지 어떻게 찾겠나요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“예시처럼 표로 정리해 줘.”",
        "reason": "예시의 어떤 부분을 따를지와 원자료의 값·미정 처리 조건이 빠졌습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“두 행, 세 열인지 확인합니다.”",
        "reason": "구조만 맞아도 이름과 기한은 틀릴 수 있습니다. 원자료와 값도 대조하세요."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  },
  {
    "title": "내 작업에 적용하고 다시 확인하기",
    "phase": "마무리 · 변경 요청",
    "question": "다른 작업에서도 조건을 나누고 전달 방식을 고를 수 있을까요?",
    "caseIndex": null,
    "lesson": [
      "문서를 수정하거나 설정 변경을 요청할 때도 바꿀 부분과 남길 부분을 먼저 구분합니다. 같은 내용을 지시만으로 전달할지, 예시나 빈 틀로 보여 줄지 작업에 맞춰 정하세요.",
      "받은 답은 조건별로 확인합니다. 설명이 그럴듯해도 바꾸지 말라고 한 항목을 수정했다면 조건을 어긴 것입니다. 맞는 부분은 유지하고, 어긴 부분을 찾아 고칩니다.",
      "지금은 준비된 변경안으로 연습합니다. 내 작업에서는 원자료와 요청, 받은 응답을 함께 남기고 같은 기준으로 비교해 보세요. 며칠 뒤 다시 풀 때는 이전 답을 보기 전에 먼저 판단합니다."
    ],
    "task": "작업 알림 설정의 변경안을 AI에게 요청합니다. 설정 파일의 항목 이름과 의미는 다음과 같습니다.\n\n원래 설정: enabled=true(알림 켜짐), hour=9(오전 9시), channel=\"email\"(이메일).\n요청: 알림 시간을 오전 10시로 바꿉니다. 알림 켜짐과 이메일 방식은 유지합니다. 결과에는 바뀔 항목만 적습니다.\n\n1. 이 조건을 전달할 프롬프트를 쓰세요. 지시·예시·빈 틀 중 선택한 이유도 적으세요.\n2. 아래 연습 변경안을 검사하고 틀린 부분을 고치세요.\n3. 내가 AI에게 맡길 작업을 하나 정하고, 바꿀 것·남길 것·결과 형식을 포함한 요청을 세 문장 이내로 적으세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 쓰세요.",
      "프롬프트 또는 수정안을 쓰고, 결과를 확인할 방법을 적으세요."
    ],
    "checks": [
      "hour만 10으로 바꾸고 enabled와 channel은 유지하도록 요청했나요?",
      "변경안이 보존 조건과 출력 범위를 지켰는지 판단하고, 필요한 부분만 고쳤나요?",
      "내 작업의 요청에 변경 범위·보존 조건·결과 형식을 담았나요?"
    ],
    "example": "“hour를 9에서 10으로 바꾸는 변경안을 써 줘. enabled=true와 channel=\"email\"은 유지해 줘. 결과에는 바뀔 항목만 적어 줘.”라고 요청할 수 있습니다. 바꿀 항목이 하나라 지시만으로 시작할 수 있습니다. 연습 변경안에서는 channel=\"sms\"를 지우고 hour=10만 남깁니다. 내 작업도 같은 순서로 조건을 정리하되, 필요한 경우 예시나 빈 틀을 더하세요.",
    "extra": "내 작업에서 받은 응답을 보관하고 조건별로 확인해 보세요. 전달 방식을 바꿔 비교한다면 원자료·모델·다른 조건은 같게 유지하세요.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“시간을 바꿔 줘. 보기 좋게 정리해 줘.”",
        "reason": "어떤 항목을 어떤 값으로 바꿀지, 무엇을 유지할지가 빠졌습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“hour를 10으로 바꾸고 channel을 email로 유지합니다.”",
        "reason": "변경안에 이미 맞는 항목까지 나열하지 않도록 결과 범위도 정해야 합니다."
      }
    ],
    "draftHint": "지켜야 할 조건: …\n선택한 방법과 이유: …\n프롬프트 또는 수정안: …\n확인 방법: …"
  }
];
let courseIndex=-1;
function courseState(){if(!saved.course20||typeof saved.course20!=='object')saved.course20={};return saved.course20;}
function courseEntry(){const all=courseState();return all[courseIndex]||(all[courseIndex]={fields:{},checks:[],history:[],status:'draft'});}
function courseField(key,label,value,placeholder=''){return `<label class="field" for="course-${key}">${esc(label)}</label><textarea id="course-${key}" data-course-field="${key}" maxlength="12000" placeholder="${esc(placeholder)}">${esc(value||'')}</textarea>`;}
function renderCourse(){const all=courseState();
 if(courseIndex<0){const done=Object.values(all).filter(x=>x.status==='reviewed').length;
 $('#main').innerHTML=`<section class="hero"><div><div class="eyebrow">프롬프트 실험실 · 단계별 학습 과정</div><h1>조건을 읽는 것에서<br>스스로 설계하는 것까지.</h1><p class="muted">요청한 조건과 예시를 점검하고, 응답에서 어긋난 부분을 찾아보세요. 여러 날에 나누어 프롬프트를 쓰고 고치는 연습을 합니다.</p></div><div class="hero-aside"><strong>${done}/8</strong><small>마친 차시</small></div></section><div class="card"><h2>한 번에 핵심 질문 하나, 약 20분</h2><p class="note">읽기 3분 → 설계 7분 → 해설 대조·수정 7분 → 정리 3분. 강제 타이머는 없습니다.</p><p>하루에 한 차시씩, 약 20분 동안 연습해 보세요. 시간이 부족하면 초안을 저장하고 다음에 이어가도 됩니다. 추가 탐구는 선택입니다.</p><div class="steps"><span>분석하고 초안 쓰기</span><span>근거·반례와 대조하기</span><span>수정하고 이유 남기기</span></div><p>앞 차시에서는 설명과 예시를 따라 연습하고, 뒤 차시에서는 새로운 과제의 프롬프트를 직접 작성합니다.</p><div class="actions"><button class="primary" id="course-resume">${Object.keys(all).length?'이어서 학습':'1차시 시작'}</button><button id="course-export">학습 과정 백업</button><label class="import-label">백업 불러오기<input id="course-import" type="file" accept="application/json,.json"></label></div><p class="note">입력 내용은 이 브라우저에 자동 저장합니다. 기기를 바꾸기 전에는 백업 파일을 내려받으세요.</p></div>${saved.course&&Object.keys(saved.course).length?'<div class="result"><p>개편 전 과정의 기록은 보존했습니다. 새 과제의 답안으로 옮기지 않았습니다.</p><button id="legacy-course-export">이전 과정 기록 내려받기</button></div>':''}<div class="course-grid">${COURSE.map((u,i)=>`<button class="course-card" data-course-open="${i}"><span class="eyebrow">${String(i+1).padStart(2,'0')} · ${esc(u.phase)}</span><h2>${esc(u.title)}</h2><p>${esc(u.question)}</p><small>${esc(u.minutes)} · ${all[i]?.status==='reviewed'?'검토 완료':all[i]?'작성 중':'시작 전'}</small></button>`).join('')}</div>`;
 document.querySelectorAll('[data-course-open]').forEach(b=>b.onclick=()=>openCourse(+b.dataset.courseOpen));
 if(saved.course&&Object.keys(saved.course).length)$('#legacy-course-export').onclick=()=>download('prompt-lab-course-legacy.json',JSON.stringify({format:'prompt-lab-course',version:1,course:saved.course},null,2),'application/json');
 $('#course-resume').onclick=()=>openCourse(COURSE.findIndex((u,i)=>all[i]?.status!=='reviewed')<0?7:COURSE.findIndex((u,i)=>all[i]?.status!=='reviewed'));
 $('#course-export').onclick=()=>download('prompt-lab-course.json',JSON.stringify({format:'prompt-lab-course',version:2,course:all},null,2),'application/json');
 $('#course-import').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(file.size>1500000){notify('백업은 1.5MB 이하 파일만 읽습니다.');return;}try{const data=JSON.parse(await file.text());const clean=validateCourseBackup(data);if(!confirm('현재 단계별 학습 기록을 이 백업으로 바꿀까요? 필요하면 먼저 백업하세요.'))return;saved.course20=clean;persist();renderCourse();notify('백업을 불러왔습니다.');}catch(err){notify('읽을 수 없는 백업입니다. 프롬프트 실험실 학습 과정 JSON을 선택하세요.');}};return;}
 const u=COURSE[courseIndex],v=courseEntry(),f=v.fields;
 $('#main').innerHTML=`<div class="section-title"><button id="course-home">← 전체 과정</button><span class="tag">${courseIndex+1} / 8 · ${esc(u.phase)}</span></div><h1>${esc(u.title)}</h1><p class="muted">${esc(u.question)} · 예상 ${esc(u.minutes)}</p><div class="course-work"><section><div class="card"><h2>1. 설명 읽기</h2>${u.lesson.map(p=>`<p>${esc(p)}</p>`).join('')}${u.caseIndex!==null?`<div class="result"><strong>연구에서 확인한 자료</strong><p>${esc(DATA.cases[u.caseIndex].lesson)}</p><p class="note">${DATA.cases[u.caseIndex].aggregate.map(a=>esc(a["조건명"])+": "+esc(a["준수율(%)"])+"% ("+esc(a["짝 수"])+"쌍)").join(" · ")}<br>평균 규칙 준수율이며 글 전체 성공률은 아닙니다.</p></div><details><summary>선택 · 원자료 전체 읽기 · 사례 ${u.caseIndex+1}</summary>${courseEvidence(u.caseIndex)}</details>`:''}</div><div class="card"><h2>2. 직접 설계하기</h2><div class="task-brief">${esc(u.task).replace(/\n/g,'<br>')}</div>${u.prompts.map((p,i)=>courseField('answer'+i,p,f['answer'+i])).join('')}<div class="actions"><button class="primary" id="course-draft">${v.initial?'검토 단계 다시 열기':'초안 보존하고 검토 기준 열기'}</button><button id="course-save">지금 저장</button></div><p id="course-save-status" role="status" class="note">${v.updated?'마지막 저장: '+esc(new Date(v.updated).toLocaleString('ko-KR')):'입력하면 자동 저장됩니다.'}</p></div><div id="course-review"></div></section><aside><div class="card course-sticky"><h3>이번에 작성할 것</h3><p>짧은 초안 하나 + 수정본 + 수정 이유 한두 줄</p><p class="note">답안을 쓴 뒤 아래 기준과 해설을 보며 점검하세요.</p><h3>확인할 기준</h3><ul>${u.checks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>다음 시간까지</h3><p>${esc(u.transfer)}</p>${v.initial?`<details><summary>보존된 첫 초안</summary><div class="response">${esc(v.initial)}</div></details>`:''}${v.history.length?`<details><summary>검토 기록 ${v.history.length}개</summary>${v.history.map(h=>`<p><small>${esc(new Date(h.date).toLocaleString('ko-KR'))}</small></p><div class="response">${esc(h.revision)}</div><p>${esc(h.reason)}</p>`).join('')}</details>`:''}</div></aside></div>`;
 $('#course-home').onclick=()=>{courseIndex=-1;renderCourse();window.scrollTo(0,0);};
 bindCourseFields();
 $('#course-save').onclick=()=>{v.updated=new Date().toISOString();if(persist())notify('차시 기록을 저장했습니다.');};
 $('#course-draft').onclick=()=>{if(u.prompts.some((p,i)=>!String(f['answer'+i]||'').trim())){notify('짧은 분석과 설계 초안 두 칸을 먼저 작성해 주세요.');return;}if(!v.initial)v.initial=u.prompts.map((p,i)=>p+'\n'+f['answer'+i]).join('\n\n');else{v.workingSnapshot=u.prompts.map((p,i)=>p+'\n'+f['answer'+i]).join('\n\n');}v.updated=new Date().toISOString();persist();renderCourse();$('#course-review').scrollIntoView({behavior:'smooth'});};
 if(v.initial)renderCourseReview();
}
function courseEvidence(index){const c=DATA.cases[index];return `<p class="note">${esc(c.source)} · ${esc(c.task)} · ${esc(c.items[0].model)}</p>${c.items.map(x=>`<h3>${esc(x.name)}</h3><details><summary>실제 입력</summary><div class="prompt">${esc(x.prompt)}</div></details><div class="response">${esc(x.response)}</div><p>원채점 준수 ${x.checks.filter(Boolean).length}/8</p>`).join('')}<p>${esc(c.lesson)}</p>${c.aggregate.map(a=>`<p>전체 집계: ${esc(a['조건명'])} · ${esc(a['짝 수'])}쌍 · 평균 규칙 준수율 ${esc(a['준수율(%)'])}%</p>`).join('')}<p class="note">선택된 한 쌍은 전체 효과의 크기를 대표하지 않습니다. 위 수치는 글 전체 성공률과 다릅니다.</p>`;}
function openCourse(i){courseIndex=i;renderCourse();window.scrollTo(0,0);}
function bindCourseFields(){document.querySelectorAll('[data-course-field]').forEach(el=>el.oninput=()=>{const v=courseEntry();v.fields[el.dataset.courseField]=el.value;v.updated=new Date().toISOString();if(v.status==='reviewed')v.status='draft';const ok=persist();const status=$('#course-save-status');if(status)status.textContent=ok?'자동 저장됨 · '+new Date(v.updated).toLocaleTimeString('ko-KR'):'저장이 제한되었습니다. 화면을 닫기 전 학습 과정 백업을 받으세요.';});}
function renderCourseReview(){const u=COURSE[courseIndex],v=courseEntry(),f=v.fields;
 $('#course-review').innerHTML=`<div class="card"><h2>3. 초안을 대조하고 고치기</h2><p>아래 기준에 맞는 내용을 초안에서 찾아보세요. 빠진 부분이 있다면 고쳐 주세요.</p><details><summary>예시 답안과 해설</summary><div class="result">${esc(u.example)}</div></details>${courseField('revision','수정한 최종 설계',f.revision,'수정한 설계를 적으세요. 바꾸지 않았다면 그대로 남기고 이유를 적어도 됩니다.')}${courseField('reason','무엇을 왜 바꾸었나요? 바꾸지 않았다면 그 근거는 무엇인가요?',f.reason)}<details class="optional-work"><summary>선택 탐구 · 오늘 끝내지 않아도 됩니다</summary><p>${esc(u.extra)}</p>${courseField('counter','선택 탐구 메모',f.counter)}</details><fieldset><legend>내가 근거를 찾아 확인한 항목</legend>${u.checks.map((x,i)=>`<label class="rule"><input type="checkbox" data-course-check="${i}" ${v.checks.includes(i)?'checked':''}>${esc(x)}</label>`).join('')}</fieldset><div class="actions"><button class="primary" id="course-complete">이번 검토 기록 남기기</button>${courseIndex<7?'<button id="course-next">다음 차시 살펴보기 →</button>':''}</div><p id="course-reviewed" role="status"></p></div>`;
 bindCourseFields();document.querySelectorAll('[data-course-check]').forEach(el=>el.onchange=()=>{const i=+el.dataset.courseCheck;v.checks=el.checked?[...new Set([...v.checks,i])]:v.checks.filter(x=>x!==i);v.status='draft';persist();});
 $('#course-complete').onclick=()=>{if(['revision','reason'].some(k=>!String(f[k]||'').trim())||v.checks.length!==u.checks.length){notify('수정본과 짧은 수정 이유를 적고, 검토한 기준을 확인해 주세요. 아직 어렵다면 초안으로 저장해 두어도 됩니다.');return;}v.history.push({date:new Date().toISOString(),revision:f.revision,reason:f.reason,counter:f.counter});v.history=v.history.slice(-20);v.status='reviewed';v.updated=new Date().toISOString();if(persist())$('#course-reviewed').textContent='수정한 답안과 이유를 저장했습니다. 다음 차시에서 다른 과제에 적용해 보세요.';};
 if(courseIndex<7)$('#course-next').onclick=()=>openCourse(courseIndex+1);
}
function validateCourseBackup(data){
 if(data?.format!=='prompt-lab-course'||data.version!==2||!data.course||typeof data.course!=='object')throw Error('format');
 const result={};const text=x=>typeof x==='string'?x.slice(0,12000):'';
 for(let i=0;i<8;i++){const v=data.course[i];if(!v)continue;if(!v.fields||typeof v.fields!=='object')throw Error('fields');const fields={};for(const k of ['recall','answer0','answer1','answer2','revision','reason','counter'])fields[k]=text(v.fields[k]);result[i]={fields,checks:Array.isArray(v.checks)?[...new Set(v.checks.filter(n=>Number.isInteger(n)&&n>=0&&n<3))]:[],history:Array.isArray(v.history)?v.history.slice(-20).filter(h=>h&&typeof h==='object').map(h=>({date:text(h.date),revision:text(h.revision),reason:text(h.reason),counter:text(h.counter)})):[],status:v.status==='reviewed'?'reviewed':'draft',initial:typeof v.initial==='string'?v.initial.slice(0,40000):'',updated:text(v.updated)};}
 return result;
}
