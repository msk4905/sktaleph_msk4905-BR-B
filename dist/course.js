'use strict';
const COURSE=[
  {
    "title": "바꿀 부분과 남길 정보 정하기",
    "phase": "문서 수정",
    "question": "안내문을 줄일 때, 꼭 남겨야 하는 정보는 무엇일까요?",
    "caseIndex": 0,
    "lesson": [
      "AI에게 보내는 요청을 ‘프롬프트’라고 합니다. 프롬프트에는 무엇을 바꿀지와 무엇을 그대로 둘지를 함께 적어야 합니다. “짧게 고쳐 줘”라고만 하면 AI는 길이를 줄이는 데 집중하다가, 마감일이나 참가비 같은 정보를 빼거나 바꿀 수 있습니다. 이런 일은 실제로도 일어납니다. 2025년 BBC가 AI 서비스 4곳에 뉴스 질문을 했을 때, BBC 기사를 인용한 답의 19%에서 사실이나 숫자, 날짜가 틀리게 옮겨졌습니다.",
      "조건은 답을 받은 뒤 바로 확인할 수 있는 형태로 적는 것이 좋습니다. “잘 정리해 줘”라고 하면 무엇을 확인해야 할지 알 수 없지만, “본문을 2문장으로 줄이고 마감일과 참가비는 그대로 적어 줘”라고 하면 문장 수를 세고 두 정보를 맞춰 보기만 하면 됩니다. 다만 짧게 줄이는 것 자체가 목표는 아닙니다. 2문장 안에 필요한 정보가 모두 들어갈 수 있는지도 함께 생각해 보세요.",
      "답을 받은 뒤에는 형식과 내용을 나누어 확인합니다. 2문장으로 잘 줄였더라도 날짜가 하루 바뀌었다면 그대로 쓸 수 없습니다. 먼저 문장 수를 세고, 남겨 달라고 한 정보를 원문과 하나씩 맞춰 보세요. 지시만으로 원하는 답이 나오지 않을 때 쓸 수 있는 다른 방법은 다음 차시에서 다룹니다."
    ],
    "task": "단체 채팅방에 올릴 안내문을 2문장으로 줄이려고 합니다. 마감일과 참가비, 신청 방법은 원문 그대로 남겨야 합니다.\n\n원문\n독서 행사 신청을 받습니다. 신청 마감은 11월 7일입니다. 참가비는 5,000원입니다. 신청은 학교 게시판 댓글로 받습니다.\n\n1. 이번 작업에서 바꿀 부분과 그대로 남길 정보를 나누어 적어 보세요.\n2. AI에게 보낼 프롬프트를 지시로 써 보세요.\n3. 답을 받은 뒤 문장 수와 세 가지 정보를 각각 어떻게 확인할지 적어 보세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "본문을 2문장으로 줄이면서 마감일과 참가비, 신청 방법은 그대로 남기라고 요청했나요?",
      "프롬프트만 읽어도 바꿀 부분과 남길 정보가 구분되나요?",
      "문장 수는 세어 보고, 세 가지 정보는 원문과 맞춰 보는 방법을 적었나요?"
    ],
    "example": "원문을 붙인 뒤 다음과 같이 요청할 수 있습니다.\n“아래 안내문을 본문 2문장으로 줄여 줘. 신청 마감일 11월 7일, 참가비 5,000원, 신청 방법인 학교 게시판 댓글은 그대로 적어 줘. 제목은 붙이지 마.”\n\n바꿀 부분(2문장으로 줄이기)과 남길 정보(날짜, 금액, 신청 방법)를 모두 적었기 때문에, 답을 확인하기도 쉽습니다. 예를 들어 “독서 행사 신청은 11월 7일까지 학교 게시판 댓글로 받습니다. 참가비는 5,000원입니다.”라는 답을 받았다면, 문장이 2개이고 세 정보가 원문과 같으므로 그대로 쓸 수 있습니다.",
    "extra": "안내문을 1문장으로 줄여야 한다면 세 가지 정보를 모두 담을 수 있을까요? 직접 1문장으로 줄여 본 뒤 판단해 보세요.",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“짧고 자연스럽게 고쳐 줘.”",
        "reason": "얼마나 줄일지와 무엇을 남길지가 빠져 있습니다. 이렇게 요청하면 필요한 정보까지 지워질 수 있습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“2문장으로 고쳐 줘. 날짜와 금액은 그대로 둬.”",
        "reason": "날짜와 금액은 챙겼지만 신청 방법이 빠졌습니다. 요청에 신청 방법도 적고, 답을 받은 뒤에도 확인해야 합니다."
      }
    ],
    "draftHint": "바꿀 부분: …\n그대로 남길 정보: …\n프롬프트: …\n확인 방법: …"
  },
  {
    "title": "지시, 완성 예시, 빈 틀 가운데 고르기",
    "phase": "업무 인수인계",
    "question": "원하는 순서와 모양은 어떻게 보여 주면 좋을까요?",
    "caseIndex": 3,
    "lesson": [
      "원하는 답의 모양을 AI에게 알려 주는 방법은 크게 세 가지입니다. “완료한 일 다음에 남은 일을 써 줘”처럼 말로 설명하는 ‘지시’, 원하는 모습으로 완성한 글을 보여 주는 ‘완성 예시’, 내용은 비워 두고 소제목과 자리만 보여 주는 ‘빈 틀’입니다. 지시만으로는 형식을 놓치는 일이 적지 않습니다. 2023년 IFEval 연구에서는 당시 GPT-4도 문단 수나 단어 수 같은 형식 지시를 모두 지킨 경우가 약 77%였습니다.",
      "이 앱의 바탕이 된 논문에서는 같은 지시에 완성 예시를 하나 더했을 때, 한 모델이 지킨 조건의 비율이 69.5%에서 87.9%로 올랐습니다. 내용 없이 빈 틀만 더했을 때도 67.3%에서 87.5%로 올랐습니다. 원하는 배치를 보여 주는 데 꼭 완성된 글이 필요하지는 않다는 뜻입니다.",
      "어떤 방법을 쓸지는 지금 받는 답에서 무엇이 잘못되는지를 보고 정합니다. 내용은 맞는데 소제목 순서가 자꾸 바뀐다면, 원하는 순서대로 만든 빈 틀이 알맞습니다. 특정한 말투를 보여 주고 싶다면 그 말투로 쓴 완성 예시가 더 낫습니다. 이미 지시만으로 원하는 답을 받고 있다면 굳이 무언가를 더하지 않아도 됩니다."
    ],
    "task": "동료에게 넘길 업무 메모를 정리하려고 합니다.\n\n원자료: 자료 수집은 끝났고, 표 검토는 남아 있습니다. 표 검토 마감일은 11월 9일입니다.\n조건: “완료한 일” 다음에 “남은 일”을 쓰고, 날짜는 그대로 둡니다.\n지금의 문제: 날짜는 맞게 나오지만, 두 소제목의 순서가 자주 바뀝니다.\n\n1. 지시만 유지할지, 완성 예시나 빈 틀을 더할지 고르고 이유를 적어 보세요.\n2. 고른 방법으로 프롬프트를 써 보세요.\n3. 다음 답에서 소제목 순서와 날짜를 각각 어떻게 확인할지 적어 보세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "지금의 답에서 날짜는 맞지만 소제목 순서가 바뀐다는 점을 짚었나요?",
      "고른 방법으로 두 소제목의 순서를 보여 주거나 분명하게 설명했나요?",
      "다음 답에서 순서와 11월 9일을 각각 확인하는 방법을 적었나요?"
    ],
    "example": "원자료와 지시는 그대로 두고, 다음 빈 틀을 덧붙일 수 있습니다.\n\n완료한 일\n[완료한 내용]\n\n남은 일\n[남은 내용과 마감일]\n\n내용을 채우지 않아도 이 틀만으로 두 소제목의 순서를 보여 줄 수 있습니다. 답을 받은 뒤에는 소제목이 이 순서대로 놓였는지, 마감일 11월 9일이 그대로 적혔는지 확인합니다. 완성 예시로도 순서를 보여 줄 수 있습니다. 다만 그때는 예시에 적힌 업무 내용이 답에 섞이지 않도록, 예시와 원자료를 분명하게 구분해 주어야 합니다.",
    "extra": "지시만으로도 순서와 날짜가 잘 지켜지고 있다면, 같은 빈 틀을 더할 이유가 있을까요?",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“다른 업무 메모를 아무거나 예시로 붙입니다.”",
        "reason": "다른 업무의 메모를 그대로 붙이면 그 내용이 답에 섞일 수 있습니다. 붙이기 전에 지금 필요한 소제목과 순서를 보여 주는 자료인지 확인해야 합니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“빈 틀을 붙여서 순서를 보여 줍니다.”",
        "reason": "빈 틀을 고른 이유는 맞습니다. 이제 그 틀을 직접 만들고, 원자료와 날짜를 그대로 두라는 지시도 함께 적어 보세요."
      }
    ],
    "draftHint": "고른 방법과 이유: …\n프롬프트: …\n확인 방법: …"
  },
  {
    "title": "요청과 예시가 어긋나는지 살피기",
    "phase": "고객 안내",
    "question": "예시를 그대로 따라 써도 요청을 지킬 수 있을까요?",
    "caseIndex": 4,
    "lesson": [
      "자연스러운 예시를 붙였는데도 요청과 다른 답이 나올 때가 있습니다. 이때는 예시 안에 원인이 있을 수 있습니다. 해요체로 써 달라고 하면서 “배송이 늦어졌습니다”라는 예시를 붙이면, 지시와 예시가 서로 다른 말투를 가리키게 됩니다. 논문에서도 예시의 말투를 지시와 다르게 했더니, 요청한 해요체를 지키지 못한 응답이 나온 경우가 있었습니다.",
      "이럴 때는 예시를 통째로 다시 쓰기보다, 요청과 어긋나는 부분부터 찾아보는 편이 좋습니다. 말투만 다른지, 원자료에 없는 내용까지 들어 있는지 하나씩 살펴보세요. “내일 도착합니다”처럼 확인되지 않은 약속이 들어 있다면 그 부분도 고쳐야 합니다. 반대로 문장 수나 배치처럼 이미 맞는 부분은 그대로 두어도 됩니다.",
      "말투뿐 아니라 구조가 어긋날 수도 있습니다. 지시에서는 문단 4개를 요청했는데 예시는 문단 3개로 되어 있다면, AI는 둘 중 하나를 따르게 됩니다. 논문에서도 구조가 어긋난 예시를 붙였을 때 어느 쪽을 따르는지는 모델마다 달랐습니다. 그래서 예시를 붙이기 전에, 지시에 적은 문단 수나 문장 수가 예시와 맞는지 먼저 세어 보는 것이 좋습니다."
    ],
    "task": "배송 안내를 해요체 2문장으로 쓰려고 합니다. 원자료에 없는 도착일이나 보상은 약속하면 안 됩니다.\n\n원자료: 주문 A-17은 배송이 늦어지고 있습니다. 도착 예정일은 아직 정해지지 않았습니다.\n붙이려는 예시: “배송이 늦어졌습니다. 내일 도착합니다.”\n\n1. 예시에서 요청과 어긋나는 부분을 모두 찾아 적어 보세요.\n2. 2문장 구성은 유지하면서 예시를 고쳐 보세요.\n3. 고친 예시를 붙여 요청한 뒤, 받은 답에서 무엇을 확인할지 적어 보세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "합니다체로 쓴 말투와 근거 없는 “내일 도착” 약속을 모두 찾았나요?",
      "2문장 구성은 그대로 두고, 해요체로 바꾸면서 도착일을 단정하지 않았나요?",
      "받은 답에서도 문장 수와 말투, 도착일 표현을 확인하도록 적었나요?"
    ],
    "example": "예시는 “배송이 늦어지고 있어요. 도착 예정일은 아직 정해지지 않았어요.”로 고칠 수 있습니다. 이미 맞던 2문장 구성은 남기고, 말투와 근거 없는 도착 약속만 고쳤습니다. 다만 예시를 고쳤다고 해서 다음 답이 저절로 맞는 것은 아닙니다. 새로 받은 답에서도 문장 수와 말투, 도착일 표현을 다시 확인해야 합니다.",
    "extra": "지시에서는 문단 4개를 요청했는데 붙이려는 예시가 문단 3개라면, 예시를 어떻게 고치겠나요? 고친 뒤에는 무엇을 세어 보겠나요?",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“배송이 늦어졌어요. 내일 도착해요.”",
        "reason": "말투는 해요체로 바뀌었지만 “내일 도착”이라는 약속이 남아 있습니다. 도착일이 정해지지 않았다는 원자료에 맞게 고쳐야 합니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“도착 예정일은 아직 정해지지 않았어요.”",
        "reason": "도착일에 대한 내용은 맞습니다. 하지만 1문장뿐이어서 2문장으로 쓰라는 조건을 아직 지키지 못했습니다."
      }
    ],
    "draftHint": "요청과 어긋나는 부분: …\n고친 예시: …\n받은 답에서 확인할 것: …"
  },
  {
    "title": "보기 좋은 답과 조건을 지킨 답 구분하기",
    "phase": "자료 정리",
    "question": "표의 모양이 맞으면 내용도 맞을까요?",
    "caseIndex": 2,
    "lesson": [
      "AI가 만든 표가 깔끔하다고 해서 내용까지 맞는 것은 아닙니다. 품목이 빠졌거나, 수량이 바뀌었거나, 원자료에 없는 숫자가 들어갔을 수 있습니다. 특히 수량이 적혀 있지 않은 항목에 그럴듯한 숫자가 채워져 있으면, 보기에는 자연스러워서 놓치기 쉽습니다.",
      "표를 확인할 때는 무엇을 어떻게 셀지 먼저 정해 두면 편합니다. 표 첫 줄의 ‘품목’, ‘수량’은 열 이름이지 실제 품목이 아니므로, 품목 수를 셀 때는 이 머리글과 구분선을 빼야 합니다. 수량이 없는 항목을 “미확인”으로 적기로 했다면, 그 표시가 제자리에 들어갔는지도 확인합니다. 이렇게 정한 기준은 비교하는 모든 답에 똑같이 적용합니다.",
      "검사 기준이 정해져 있지 않으면 같은 답도 다르게 판정할 수 있습니다. 논문 실험의 응답 가운데에는 ‘▶ 구독 해지는 어디서 해요?’처럼 소제목이 물음표로 끝나는 경우가 있었습니다. 이 줄을 문장으로 셀지에 따라 문장 수가 달라집니다. 이 앱은 ‘▶’로 시작하는 줄을 문장으로 세지 않는다는 기준을 정해 두었고, 이 기준으로 검사하면 앱에 실린 응답 12개 모두 논문의 채점과 같은 판정이 나옵니다. ‘응답 비교’ 화면에서 이 기준을 직접 확인해 보세요."
    ],
    "task": "물품 메모를 “품목 | 수량” 순서의 열 2개로 된 표로 옮기려고 합니다. 품목 3개를 모두 넣고, 수량이 없는 항목은 “미확인”으로 적어야 합니다.\n\n원자료: 펜 2개, 공책(수량 없음), 파일 3개\n받은 표:\n| 품목 | 수량 |\n| --- | --- |\n| 펜 | 2개 |\n| 공책 | 1개 |\n| 파일 | 3개 |\n\n1. 열이 2개인지, 품목 3개가 모두 있는지, 수량을 원자료대로 옮겼는지 각각 판단해 보세요.\n2. 틀린 부분만 고친 표를 써 보세요.\n3. 같은 작업의 다른 답에도 적용할 검사 기준을 적어 보세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "열 2개와 품목 3개는 맞고, 공책 수량은 틀렸다고 구분했나요?",
      "공책 수량만 “미확인”으로 고치고, 나머지는 그대로 두었나요?",
      "머리글과 구분선을 빼고 품목을 센 뒤, 각 값을 원자료와 맞춰 보는 기준을 적었나요?"
    ],
    "example": "표는 열 2개로 되어 있고, 품목 3개도 모두 들어 있습니다. 하지만 공책 수량 ‘1개’는 원자료에 없는 숫자이므로, 이 칸만 “미확인”으로 고치면 됩니다. 다른 답을 검사할 때도 머리글과 구분선을 빼고 품목을 센 뒤, 각 수량을 원자료와 맞춰 보세요. 표의 모양만 보았다면 공책 수량이 바뀐 것을 놓쳤을 수 있습니다.",
    "extra": "소제목을 문장 수에 넣을지 뺄지 정하지 않으면, 같은 응답도 사람마다 다르게 판정합니다. 어떤 기준을 정하고, 검사 기록에 어떻게 적어 두겠나요?",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“품목이 3개이므로 모두 맞습니다.”",
        "reason": "품목 수는 맞지만, 공책 수량 1개는 원자료에 없습니다. 품목을 센 다음에는 각 수량도 맞춰 봐야 합니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“공책의 1개를 지웁니다.”",
        "reason": "잘못된 숫자를 찾은 것은 맞습니다. 다만 지우기만 하면 칸이 비게 되므로, 요청대로 “미확인”이라고 적어야 합니다."
      }
    ],
    "draftHint": "조건별 판단: …\n고친 표: …\n검사 기준: …"
  },
  {
    "title": "전달 방식 하나만 바꿔서 비교하기",
    "phase": "진행 보고",
    "question": "빈 틀이 도움이 되었는지 어떻게 알 수 있을까요?",
    "caseIndex": 3,
    "lesson": [
      "프롬프트를 고쳤더니 답이 좋아졌다고 해 봅시다. 그런데 그사이에 모델과 원자료까지 바꿨다면, 무엇 때문에 좋아졌는지 알 수 없습니다. 빈 틀이 도움이 되는지 알고 싶다면 다른 조건은 모두 그대로 두고, 빈 틀을 더한 요청과 더하지 않은 요청을 비교해야 합니다. 논문도 같은 과제와 규칙에서 한 가지 요소만 바꾸는 방식으로 비교했습니다.",
      "두 요청에는 같은 원자료와 공통 조건을 넣고, 모델과 출력 길이 제한 같은 설정도 맞춥니다. 한쪽에만 쉬운 자료를 주거나 한쪽만 더 많이 실행하면, 빈 틀의 효과를 따로 떼어 보기 어렵습니다. 각 방식은 여러 번 실행하되, A와 B를 번갈아 실행하면 실행 순서의 영향이 한쪽에 몰리는 것도 막을 수 있습니다.",
      "비교할 때는 잘 나온 답만 남기지 말고, 잘못 나온 답과 실행 오류도 함께 기록해야 합니다. 그래야 각 방식을 몇 번 시도해서 실제로 어떤 답을 받았는지 알 수 있습니다. 아래 자료를 펼치면, 논문에서 지시만 쓴 경우와 빈 틀을 더한 경우를 비교한 실제 결과를 볼 수 있습니다."
    ],
    "task": "진행 보고를 “완료 → 진행 중 → 막힌 일” 순서로 정리하려고 합니다. 빈 틀이 이 순서를 지키는 데 도움이 되는지 비교해 보려고 합니다.\n\n지금의 계획\nA: 모델 X, 지시만 사용, 짧은 원자료, 1번 실행\nB: 모델 Y, 빈 틀 추가, 긴 원자료, 5번 실행\n\n두 요청에 공통으로 쓸 원자료\n설문 수집은 끝났습니다. 결과 집계는 진행 중입니다. 응답 파일은 접근 권한이 없어서 확인하지 못했습니다.\n공통 조건: 원자료에 없는 일은 추가하지 않습니다.\n\n1. 지금의 계획에서 빈 틀의 효과를 판단하기 어렵게 만드는 차이를 모두 찾아 보세요.\n2. 같은 원자료와 모델을 쓰는 A와 B의 요청을 써 보세요. B에는 A와 같은 지시에 빈 틀만 더합니다.\n3. 각 방식의 실행 횟수와 순서, 응답과 오류를 기록할 방법을 정해 보세요. 계획만 세워도 되며, 직접 실행해 보는 것은 선택입니다.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "모델과 원자료, 실행 횟수가 다르다는 점을 찾고, 두 방식에서 같게 맞췄나요?",
      "A의 지시를 B에도 그대로 쓰고, B에만 세 소제목의 빈 틀을 더했나요?",
      "각 방식의 실행 횟수와 순서, 응답과 오류를 기록하는 방법을 정했나요?"
    ],
    "example": "두 요청에 같은 원자료를 붙이고 “완료, 진행 중, 막힌 일 순서로 정리해 줘. 원자료에 없는 일은 추가하지 마.”라고 지시합니다. B에는 다음 빈 틀만 더합니다.\n\n완료\n[완료한 일]\n진행 중\n[진행 중인 일]\n막힌 일\n[막힌 일]\n\n그다음 같은 모델과 설정으로 각 방식을 5번씩, A와 B를 번갈아 실행하는 계획을 세울 수 있습니다. 받은 답은 같은 기준으로 검사하고, 오류가 난 실행도 빠짐없이 기록합니다.",
    "extra": "‘나의 실험’에서 문단 수와 말투를 정하고, 세 가지 전달 방식을 직접 비교해 보세요. 날짜나 내용이 그대로인지는 받은 답을 읽고 직접 확인해야 합니다.",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“모델 Y의 답이 더 좋으면 빈 틀을 쓰겠습니다.”",
        "reason": "B의 답이 더 좋더라도 빈 틀 때문인지, 모델이나 원자료가 달라서인지 알 수 없습니다. 빈 틀 외의 조건부터 같게 맞춰야 합니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“같은 모델로 A는 1번, B는 5번 요청하겠습니다.”",
        "reason": "모델은 맞췄지만 실행 횟수가 다릅니다. 두 방식을 같은 횟수로 실행하고, 받은 답과 오류도 빠짐없이 기록해야 합니다."
      }
    ],
    "draftHint": "판단을 어렵게 만드는 차이: …\nA의 요청과 B에 더할 빈 틀: …\n실행 횟수, 순서, 기록 방법: …"
  },
  {
    "title": "평균 준수율과 중요한 오류 함께 보기",
    "phase": "결과 해석",
    "question": "평균이 같으면 모든 조건을 지킨 답의 수도 같을까요?",
    "caseIndex": 5,
    "lesson": [
      "조건을 얼마나 잘 지켰는지 보여 주는 숫자는 두 가지로 나누어 봐야 합니다. ‘평균 규칙 준수율’은 검사한 조건 가운데 통과한 조건의 비율이고, ‘모든 조건을 지킨 응답의 비율’은 받은 답 가운데 조건을 하나도 어기지 않은 답의 비율입니다. 비슷해 보여도 무엇으로 나누는지가 다르기 때문에 서로 다른 숫자가 나옵니다. 이 앱에서 보여 주는 논문의 수치는 앞의 것, 즉 평균 규칙 준수율입니다.",
      "예를 들어 모든 답이 조건을 하나씩 어긴 경우와, 몇몇 답에만 오류가 몰린 경우는 평균이 같을 수 있습니다. 하지만 바로 쓸 수 있는 답, 즉 모든 조건을 지킨 답의 수는 다릅니다. 어떤 조건에서 실패가 나는지도 따로 봐야 합니다. 이 앱에 실린 논문 응답 12개 가운데 7개가 ‘전체 문장 수’ 조건을 어겼습니다. 평균만 보았다면 실패가 한 조건에 몰려 있다는 사실을 놓치기 쉽습니다.",
      "어느 방식이 나은지는 모델과 작업에 따라 달라질 수 있습니다. 논문에서도 한 모델은 예시를 더하자 준수율이 크게 올랐지만, 다른 모델은 차이가 거의 없었습니다. 2025년 BBC 조사에서도 BBC 기사를 옮기는 과정에서 문제가 생긴 답의 비율이 서비스에 따라 15%에서 34%까지 달랐습니다. 그러니 내 작업에서 가장 중요한 조건이 무엇인지, 그 조건에서 어떤 오류가 났는지 함께 살펴보세요."
    ],
    "task": "안내문을 고치는 작업에서 조건 4개를 검사했습니다. ① 2문장으로 쓰기 ② 해요체로 쓰기 ③ 마감일 유지 ④ 금액 유지입니다.\n\nA: 응답 5개가 각각 4개, 3개, 3개, 2개, 4개 조건을 지켰습니다.\nB: 응답 5개가 각각 4개, 4개, 4개, 2개, 2개 조건을 지켰습니다.\n추가 기록: A는 응답 5개 모두 마감일을 지켰고, B는 응답 2개에서 마감일을 바꿨습니다.\n\n1. 각 방식의 평균 규칙 준수율과 모든 조건을 지킨 응답의 비율을 계산해 보세요.\n2. 마감일이 바뀌는 것을 특히 피해야 한다면, 두 결과에서 무엇을 주의해서 보겠나요?\n3. 이번 한 번의 비교를 넘어 더 확인할 내용을 하나 적어 보세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "A와 B 모두 조건 검사를 20번 했다는 것을 바탕으로 계산했나요?",
      "평균 규칙 준수율과 모든 조건을 지킨 응답의 비율을 구분해서 적었나요?",
      "B의 마감일 오류를 따로 짚고, 다음 비교에서 확인할 내용을 적었나요?"
    ],
    "example": "A와 B는 모두 조건 검사 20번 가운데 16번을 통과했으므로, 평균 규칙 준수율은 둘 다 80%입니다. 하지만 모든 조건을 지킨 응답의 비율은 A가 5개 가운데 2개로 40%, B가 5개 가운데 3개로 60%입니다.\n\n바로 쓸 수 있는 답만 보면 B가 더 많습니다. 하지만 B는 마감일을 2번이나 바꿨습니다. 날짜를 정확히 옮겨야 하는 작업이라면 이 오류를 가볍게 볼 수 없습니다. 평균과 함께 어떤 조건을 어겼는지 살펴보고, 같은 작업의 다른 자료로 더 비교해 보는 편이 좋습니다.",
    "extra": "응답을 받지 못한 오류가 1번 더 있었다면, 시도한 횟수와 받은 응답 수를 어떻게 구분해서 기록하겠나요?",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“평균이 80%로 같으므로 두 방식은 같습니다.”",
        "reason": "평균은 같지만 모든 조건을 지킨 답의 수가 다르고, 마감일을 바꾼 횟수도 다릅니다. 두 결과가 같다고 볼 수 없습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“B가 60%이므로 무조건 B가 낫습니다.”",
        "reason": "모든 조건을 지킨 응답의 비율이 B가 더 높은 것은 맞습니다. 하지만 날짜가 중요한 작업이므로, 마감일을 바꾼 답 2개도 함께 고려해야 합니다."
      }
    ],
    "draftHint": "A와 B의 두 가지 비율: …\n주의해서 볼 점: …\n더 확인할 내용: …"
  },
  {
    "title": "새 자료로 두 요청을 만들고 비교하기",
    "phase": "회의 메모",
    "question": "같은 회의 메모로 받은 두 표에서 무엇을 비교해야 할까요?",
    "caseIndex": null,
    "lesson": [
      "이번에는 회의 메모를 표로 정리해 봅니다. 이름과 기한은 그대로 옮기면서, 열을 원하는 순서로 놓아야 합니다. A는 지시만으로 요청하고, B는 같은 지시에 빈 표를 더해 요청합니다. 원자료와 조건은 같게 두고, 표의 모양을 보여 주는 자료만 더하는 비교입니다.",
      "두 답을 받으면 열 순서와 이름, 기한을 나누어 확인해 보세요. 열 순서가 맞아도 이름이 바뀌었을 수 있고, 정보는 맞는데 열 순서가 다를 수도 있습니다. 논문에서도 빈 틀이 문장 수는 더 잘 지키게 했지만, 첫 문장 길이 조건은 오히려 덜 지킨 경우가 있었습니다. 그래서 어느 쪽이 좋아 보이는지보다, 각 답이 무엇을 지켰고 무엇을 놓쳤는지를 조건별로 보는 편이 정확합니다.",
      "이번 비교에서 확인한 부분을 근거로, 다음 요청에서 어떤 방식을 쓸지 정해 보세요. 열 순서를 바로잡는 데 빈 표가 도움이 되었는지, 그 대신 놓친 정보는 없는지가 선택의 근거가 됩니다."
    ],
    "task": "회의 메모를 표로 정리하려고 합니다.\n원자료: 자료 정리(담당 민지, 기한 11월 8일), 일정 확인(담당 준호, 기한 미정)\n공통 조건: “할 일 | 담당 | 기한” 순서의 열 3개에 할 일 2개를 모두 적습니다. 이름과 날짜는 그대로 두고, 기한이 없으면 “미정”으로 적습니다.\n\nA는 원자료와 공통 조건을 지시로 전달하고, B는 A에 내용 없는 빈 표만 더합니다.\n1. A의 프롬프트와 B에 더할 빈 표를 직접 써 보세요. B에서 A와 같은 부분은 다시 적지 않아도 됩니다.\n2. 아래 두 응답에 같은 기준을 적용해 판단하고, 차이가 난 부분을 각 응답에서 짚어 보세요. 어긴 조건이 있다면 그 부분을 고쳐 보세요.\n3. 다음 요청에서 어떤 방식을 쓸지 이유와 함께 적어 보세요. 비교를 반복한다면 두 방식에서 같게 둘 조건도 적어 보세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "A와 B에 같은 원자료와 조건을 넣고, B에만 빈 표를 더했나요?",
      "열 순서와 정보 보존을 나누어 비교하고, 두 응답의 근거를 짚어 틀린 부분을 고쳤나요?",
      "다음에 쓸 방식과 이유, 비교를 반복할 때 같게 둘 조건을 적었나요?"
    ],
    "example": "A의 프롬프트에는 원자료와 공통 조건을 그대로 담습니다. B는 같은 내용 뒤에 다음 빈 표만 덧붙입니다.\n\n| 할 일 | 담당 | 기한 |\n| --- | --- | --- |\n| [할 일] | [담당] | [기한] |\n\n응답 A는 열이 “담당 → 할 일 → 기한” 순서여서 요청과 다릅니다. 열만 “할 일 → 담당 → 기한” 순서로 옮기면 되고, 이름과 기한은 맞으므로 그대로 둡니다.\n응답 B는 열 순서는 맞지만 “민지”를 “민수”로, “미정”을 “11월 9일”로 바꿨습니다. B에서는 이 두 값만 원자료대로 고칩니다.\n\n다음 요청에서는 열 순서를 보여 주려고 빈 표를 더해 볼 수 있습니다. 하지만 이번 B처럼 정보가 바뀔 수도 있으므로, 이름과 기한을 원자료와 맞춰 보는 확인은 계속해야 합니다. 지시만 유지하면서 답을 더 지켜보는 선택도 가능합니다. 어느 쪽이든 이번 응답에서 확인한 내용을 근거로 설명하면 됩니다.\n비교를 반복할 때는 원자료와 공통 조건, 모델, 설정, 검사 기준을 같게 두고 여러 답을 살펴봅니다.",
    "extra": "원자료의 이름과 날짜를 다른 값으로 바꿔 한 번 더 요청한다면, 예시나 이전 답의 값이 섞였는지 어떻게 찾아내겠나요?",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“B의 표가 보기 좋으니 빈 표가 항상 낫습니다.”",
        "reason": "B는 열 순서는 맞지만 이름과 기한이 바뀌었습니다. 표가 보기 좋은지만으로는 고를 수 없습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“A는 열 순서가 다르고, B는 이름과 기한이 틀렸습니다.”",
        "reason": "두 응답에서 고칠 부분을 정확히 찾았습니다. 이 과제에서는 비교에 쓸 요청도 직접 쓰고, 다음에 어떤 방식을 쓸지 이유와 함께 설명해야 합니다."
      }
    ],
    "draftHint": "A의 프롬프트: …\nB에 더할 빈 표: …\n두 응답의 차이, 근거, 수정: …\n다음 선택과 같게 둘 조건: …"
  },
  {
    "title": "내 작업에 적용하고 다시 확인하기",
    "phase": "공지 수정",
    "question": "비교해 본 경험을 내 작업에는 어떻게 쓸 수 있을까요?",
    "caseIndex": null,
    "lesson": [
      "공지문에서 날짜 한 곳만 바꾸는 간단한 작업에서도 요청 방법을 고를 수 있습니다. 이런 작업에서는 일부만 고쳐 달라고 했는데 AI가 다른 문장까지 매끄럽게 다듬어 버리는 일이 흔합니다. 2023년의 한 평가 연구에서도, 문법만 고쳐 달라는 작업에서 ChatGPT가 필요 이상으로 문장을 고치는 경향이 확인되었습니다. 그래서 바꿀 곳과 그대로 둘 곳을 함께 적어야 하고, 예시를 붙인다면 그 예시가 다른 문장까지 바꾸는 모습을 보여 주고 있지 않은지 먼저 확인해야 합니다.",
      "아래 연습에서는 두 수정안을 보고, 날짜를 요청대로 바꿨는지와 다른 문장을 그대로 두었는지 확인합니다. 두 수정안이 같은 조건을 모두 지켰다면, 이 자료에서는 예시를 더한 이점이 드러나지 않은 것입니다. 예시가 들어 있다는 이유만으로 더 좋은 요청이라고 고를 필요는 없습니다. 논문에서도 지시만으로 이미 조건을 잘 지킨 모델은 예시를 더해도 차이가 거의 없었습니다.",
      "이제 내가 AI에게 맡기고 싶은 작업을 하나 골라 보세요. 원자료와 지켜야 할 조건을 정한 다음, 비교할 요청 두 개를 써 봅니다. 어느 요청을 먼저 써 볼지와 그 이유도 설명해 주세요. 아직 AI에게 보내 보지 않은 요청이라면 실행 결과처럼 쓰지 말고, 앞으로 해 볼 비교 계획으로 적어 주세요."
    ],
    "task": "공지문에서 날짜만 바꾸는 수정을 요청합니다.\n원문: 독서 모임은 11월 6일 오후 7시에 도서관 2층에서 열립니다. 책은 각자 준비해 주세요. 참석하실 분은 댓글로 알려 주세요.\n공통 조건: 날짜만 11월 13일로 바꾸고, 나머지 문장은 한 글자도 바꾸지 않습니다. 결과에는 고친 공지 전체를 적습니다.\nA: 원문과 공통 조건을 지시로 전달합니다.\nB: A에 다른 공지로 만든 완성 예시를 더합니다. 예시는 “회의는 3월 2일에 열립니다. 자료는 미리 읽어 주세요.”라는 문장에서 날짜만 3월 9일로 바꾼 결과를 보여 줍니다. 실제 내용은 원문과 공통 조건을 따르라는 말도 함께 적습니다.\n\n1. 아래 두 수정안을 같은 기준으로 비교하고, 다음 요청에서 어떤 방식을 쓸지 적어 보세요. 두 수정안에서 찾은 근거와, 이 비교만으로는 알 수 없는 점도 함께 적어 주세요.\n2. 내가 AI에게 맡길 작업을 하나 정하고, 원자료와 공통 조건을 써 보세요. 그다음 지시만 쓰는 요청과, 예시나 빈 틀을 더한 요청을 직접 만들어 보세요. 더한 부분이 조건과 어긋나지 않는지도 확인해 주세요.\n3. 두 요청 가운데 먼저 쓸 방법과 이유를 적어 보세요. 비교할 때 같게 둘 조건과 검사 기준, 각 방식의 반복 횟수와 실행 순서, 응답과 오류를 기록할 방법도 정해 주세요. 아직 실행하지 않았다면 계획이라고 밝혀 주세요.",
    "prompts": [
      "과제에서 지켜야 할 조건을 정리하고, 요청할 방법과 이유를 써 보세요.",
      "프롬프트나 수정안을 쓰고, 결과를 확인할 방법을 적어 보세요."
    ],
    "checks": [
      "두 수정안을 같은 기준으로 비교하고, 다음 선택의 근거와 이 비교만으로 알 수 없는 점을 적었나요?",
      "내 작업에 쓸 두 요청을 직접 썼고, 같은 원자료와 조건을 넣은 채 한쪽에만 예시나 빈 틀을 더했나요?",
      "먼저 쓸 방식의 이유와 반복 비교 계획을 적고, 이미 확인한 것과 아직 실행하지 않은 계획을 구분했나요?"
    ],
    "example": "연습에 나온 두 수정안은 모두 날짜만 11월 13일로 바뀌었고, 나머지 문장은 원문과 같습니다. 이 한 쌍에서는 예시를 더한 이점이 드러나지 않았으므로, 지금의 지시를 유지하면서 다음 답을 지켜볼 수 있습니다.\n\n내 작업으로 동아리 회비 안내 정리를 골랐다면 다음과 같이 두 요청을 준비할 수 있습니다.\n공통 원자료: 회비는 10,000원이며, 11월 20일까지 계좌이체로 냅니다.\n공통 조건: 금액과 기한, 납부 방법을 그대로 두고, “금액 → 기한 → 납부 방법” 순서의 항목 3개로 정리합니다.\nA: 원자료를 붙이고, 공통 조건에 맞춰 정리해 달라고 지시합니다.\nB: A의 요청에 “금액: [금액] / 기한: [기한] / 납부 방법: [방법]”이라는 빈 틀만 더합니다.\n\n원하는 배치를 보여 주려고 B부터 써 볼 수 있습니다. 받은 답에서는 세 항목의 순서와 금액, 기한, 납부 방법이 그대로인지를 각각 확인합니다. 같은 모델과 설정으로 각 방식을 3번씩, A와 B를 번갈아 실행하고 모든 응답과 오류를 기록하는 계획도 세울 수 있습니다.",
    "extra": "내 작업으로 실제 답을 받았다면, 어떤 조건부터 어떤 순서로 확인하겠나요? 전달 방식을 바꿔 비교할 때 같게 둘 조건도 함께 적어 보세요.",
    "minutes": "약 20분",
    "transfer": "고친 답안과 이유를 저장해 두세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“B에 예시가 있으니 앞으로도 항상 B를 쓰겠습니다.”",
        "reason": "두 수정안이 같으므로 이 자료에서는 예시를 더한 이점이 드러나지 않았습니다. 예시가 들어 있다는 이유만으로 항상 B가 낫다고 고를 수는 없습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“두 수정안이 같으니 지금의 지시를 유지하겠습니다.”",
        "reason": "지금의 지시를 유지하는 판단은 타당합니다. 다만 이 과제에서는 내 작업에 쓸 두 요청과 앞으로의 비교 계획까지 써야 합니다."
      }
    ],
    "draftHint": "두 수정안의 비교 근거와 한계: …\n내 작업의 원자료와 공통 조건: …\n요청 A와 요청 B: …\n먼저 쓸 방법과 이유: …\n비교 계획과 실행 여부: …"
  }
];
let courseIndex=-1;
// Plain-language names for the paper's condition labels; the paper's own label stays visible.
const COND_LABELS={'기본':'지시만','예시 1개':'지시와 완성 예시','형식 틀':'지시와 빈 틀','정상 예시(중립 안내)':'말투가 맞는 예시','문체 어긋난 예시':'말투가 다른 예시'};
function condLabel(n){return COND_LABELS[n]?COND_LABELS[n]+', 논문 표기 ‘'+n+'’':n;}
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
function courseEvidence(index){const c=DATA.cases[index];return `<p class="note">${esc(c.source)} · ${esc(c.task)} · ${esc(c.items[0].model)}</p>${c.items.map(x=>`<h3>${esc(x.name)}</h3><details><summary>보낸 프롬프트</summary><div class="prompt">${esc(x.prompt)}</div></details><div class="response">${esc(x.response)}</div><p>논문 채점에서 지킨 조건: 8개 중 ${x.checks.filter(Boolean).length}개</p>`).join('')}<p>${esc(c.lesson)}</p>${c.aggregate.map(a=>`<p>전체 실험 결과: ${esc(condLabel(a['조건명']))}, 응답 ${esc(a['짝 수'])}쌍, 평균 규칙 준수율 ${esc(a['준수율(%)'])}%</p>`).join('')}`;}
function openCourse(i){courseIndex=i;renderCourse();window.scrollTo(0,0);}
function bindCourseFields(){document.querySelectorAll('[data-course-field]').forEach(el=>el.oninput=()=>{const v=courseEntry();v.fields[el.dataset.courseField]=el.value;v.updated=new Date().toISOString();if(v.status==='reviewed')v.status='draft';const ok=persist();const status=$('#course-save-status');if(status)status.textContent=ok?'자동 저장됨 · '+new Date(v.updated).toLocaleTimeString('ko-KR'):'저장이 제한되었습니다. 화면을 닫기 전 학습 과정 백업을 받으세요.';});}
function renderCourseReview(){const u=COURSE[courseIndex],v=courseEntry(),f=v.fields;
 $('#course-review').innerHTML=`<div class="card"><h2>3. 초안을 대조하고 고치기</h2><p>아래 기준에 맞는 내용을 초안에서 찾아보세요. 빠진 부분이 있다면 고쳐 주세요.</p><details><summary>예시 답안과 해설</summary><div class="result review-text">${esc(u.example)}</div></details>${courseField('revision','수정한 최종 설계',f.revision,'수정한 설계를 적으세요. 바꾸지 않았다면 그대로 남기고 이유를 적어도 됩니다.')}${courseField('reason','무엇을 왜 바꾸었나요? 바꾸지 않았다면 그 근거는 무엇인가요?',f.reason)}<details class="optional-work"><summary>선택 탐구 · 오늘 끝내지 않아도 됩니다</summary><p>${esc(u.extra)}</p>${courseField('counter','선택 탐구 메모',f.counter)}</details><fieldset><legend>내가 근거를 찾아 확인한 항목</legend>${u.checks.map((x,i)=>`<label class="rule"><input type="checkbox" data-course-check="${i}" ${v.checks.includes(i)?'checked':''}>${esc(x)}</label>`).join('')}</fieldset><div class="actions"><button class="primary" id="course-complete">이번 검토 기록 남기기</button>${courseIndex<7?'<button id="course-next">다음 차시 살펴보기 →</button>':''}</div><p id="course-reviewed" role="status"></p></div>`;
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
