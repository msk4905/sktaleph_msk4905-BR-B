'use strict';
// Instructional extensions; not new thesis findings.
const COURSE=[
  {
    "title": "원하는 답을 받기 위해 조건 정하기",
    "phase": "기초 · 연구 질문",
    "question": "좋은 답을 원한다면 무엇부터 정해야 할까요?",
    "caseIndex": 0,
    "lesson": [
      "“알기 쉽게 써 줘”라고만 요청하면, 받은 답이 기대에 맞는지 판단할 기준이 모호할 수 있습니다. 먼저 누가 읽는 글인지, 어떤 내용을 담을지 정하세요. 그다음 문장 수나 말투처럼 응답에서 확인할 수 있는 조건을 적습니다.",
      "형식을 지켰다고 내용까지 정확한 것은 아닙니다. 이 과정에서는 원하는 형식을 프롬프트에 어떻게 적을지 배우고, AI의 응답이 그 조건을 지켰는지 확인합니다. 논문의 8개 조건을 모든 요청에 넣을 필요는 없습니다."
    ],
    "task": "친구가 “토요일 독서 모임 안내를 짧고 읽기 쉽게 써 줘”라고 부탁했습니다. 원정보는 토요일 오후 2시, 도서관 2층, 준비물은 책 한 권입니다. 먼저 읽을 사람과 사용할 곳을 정하고, 응답에서 확인할 수 있는 형식 조건을 세 가지 만드세요. 그 조건을 담은 프롬프트와 확인 방법을 적으세요.",
    "prompts": [
      "읽을 사람과 사용할 곳을 정하고, 그에 맞는 형식 조건 세 가지를 쓰세요.",
      "프롬프트를 작성하고, 각 조건과 원정보를 어떻게 확인할지 적으세요."
    ],
    "checks": [
      "사용할 곳에 맞는 형식 조건 세 가지를 직접 정한다",
      "조건끼리 모순되지 않으며 각각 확인 방법이 있다",
      "날짜·장소·준비물은 형식과 별도로 원정보와 대조한다"
    ],
    "example": "단체 채팅방의 친구에게 보낼 글이라면 “제목 없이, 두 문장으로, 해요체로 써 줘”라고 정할 수 있습니다. 제목 유무·본문 문장 수·문장 끝말을 확인합니다. 날짜와 장소, 준비물은 원정보와 대조합니다. 두 문장만이 정답은 아닙니다. 사용할 곳에 맞는 이유가 있고 실제로 검사할 수 있는 조건이면 됩니다.",
    "extra": "친구에게 보내는 채팅 대신 게시판 공지라면 어떤 조건을 바꾸겠나요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“보기 좋게 써 줘.”",
        "reason": "문장 수 등 확인할 조건이 없어 답안을 판정하기 어렵습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“두 문장·해요체로 써 줘.”",
        "reason": "형식은 확인할 수 있지만 사용할 곳과 원정보 확인이 빠졌습니다."
      }
    ],
    "draftHint": "사용할 곳: …\n형식 조건 세 가지: …\n프롬프트: …\n확인 방법: …"
  },
  {
    "title": "지시만 쓸지, 예시나 빈 틀을 더할지 고르기",
    "phase": "기초 · 예시와 골격",
    "question": "이 요청에도 예시가 필요할까요?",
    "caseIndex": 3,
    "lesson": [
      "지시문에는 AI가 해야 할 일과 지켜야 할 조건을 글로 적습니다. 예시는 완성된 결과를 보여 주고, 빈 틀은 내용 없이 배치와 형식만 보여 줍니다. 모든 요청에 지시문과 예시, 빈 틀을 함께 넣을 필요는 없습니다.",
      "조건이 간단하면 지시만으로 먼저 시도할 수 있습니다. 특정한 배치를 보여 주려면 빈 틀을, 말투나 표현까지 보여 주려면 예시를 고려할 수 있습니다. 이런 특징을 참고해 먼저 시도할 방법을 고르세요. 어떤 방법으로 요청했을 때 조건을 더 잘 지키는지는 실제 응답을 받아 비교해야 알 수 있습니다.",
      "논문에서는 예시와 빈 틀을 넣었을 때 지시 준수가 개선된 경우가 있었습니다. 모든 요청에서 둘 중 하나가 꼭 필요하거나 항상 더 좋다는 뜻은 아닙니다."
    ],
    "task": "두 요청에 각각 먼저 시도할 방법을 고르세요. 가: 이미 두 문장·해요체를 잘 지키는 모임 안내. 나: “접수/준비물” 두 소제목의 순서를 자주 바꾸는 안내. 지시만 쓰기, 빈 틀 더하기, 완성 예시 더하기 중 고르고 이유를 적으세요. 나에 사용할 프롬프트와 확인 기준도 작성하세요.",
    "prompts": [
      "방법을 고른 이유와 실제로 보낼 프롬프트를 적으세요.",
      "응답에서 확인할 조건과, 지키지 않았을 때 바꿀 요소 하나를 적으세요."
    ],
    "checks": [
      "가에서는 현재 문제가 없는 조건에 요소를 추가할 필요가 있는지 판단한다",
      "나에서는 소제목 순서를 전달할 방법과 선택 이유를 설명한다",
      "실제 응답에서 소제목과 순서를 확인하고 효과를 미리 단정하지 않는다"
    ],
    "example": "가에서는 지시만 유지하고 응답을 계속 확인할 수 있습니다. 나에서는 “접수 → 준비물” 순서를 명시하거나 그 순서의 빈 틀을 더해 볼 수 있습니다. 완성 예시를 고른다면 빈 틀로는 전달하기 어려운 특징이 무엇인지 설명하세요. 나의 지시 예: “접수와 준비물 두 소제목을 이 순서로 써 줘.” 어떤 방법이 더 잘 작동하는지는 같은 조건에서 비교해야 합니다.",
    "extra": "신청 방법을 매번 같은 배치로 받고 싶다면 선택이 달라질까요? 지시만 쓴 경우와 빈 틀을 더한 경우를 어떻게 비교할지 적어 보세요.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“두 요청 모두 예시를 붙입니다.”",
        "reason": "요청별로 무엇을 해결하려는지 드러나지 않습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“가에는 지시만, 나에는 빈 틀을 씁니다.”",
        "reason": "선택은 가능하지만 순서 문제와 검사 방법을 설명해야 합니다."
      }
    ],
    "draftHint": "선택 또는 판정: …\n그렇게 판단한 근거: …\n프롬프트나 수정안: …"
  },
  {
    "title": "조건의 모순과 지시·예시의 충돌 찾기",
    "phase": "분석 · 충돌",
    "question": "예시에서 무엇을 바꾸고 무엇을 남길까요?",
    "caseIndex": 4,
    "lesson": [
      "먼저 조건끼리 모순되지 않는지 확인하세요. “두 문단, 각 두 문장, 전체 다섯 문장”은 동시에 지킬 수 없습니다. 이런 요청은 예시를 추가하기 전에 조건부터 고쳐야 합니다.",
      "해요체로 쓰라고 해 놓고 합니다체 예시를 주면, 지시와 예시가 서로 다른 말투를 요구하게 됩니다. 논문에서도 일부 모델과 조건에서는 이런 충돌 때문에 지시를 덜 지키는 결과가 나왔습니다.",
      "다만 지시와 예시가 충돌한다고 해서 모든 모델이 똑같이 영향을 받는 것은 아닙니다. 예시에서 지시와 다른 부분을 찾아 고친 뒤, 실제 응답을 비교해야 합니다."
    ],
    "task": "요구: “두 문단, 각 두 문장, 해요체.” 예시: “행사를 안내합니다. 오늘 신청을 받습니다.\n\n노트북을 가져오세요. 준비물은 이게 전부예요.” 충돌하는 부분만 수정하세요. 이어서 “두 문단·각 두 문장·전체 다섯 문장”이라는 별도 요청을 검토하세요. 전체 다섯 문장을 우선한다는 담당자의 답을 받았다면, 나머지 조건을 어떻게 고칠지 적으세요.",
    "prompts": [
      "충돌하는 부분과 이미 요구에 맞는 부분을 나누세요.",
      "수정한 예시를 쓰고, 어떤 조건을 유지했는지 한 줄 적으세요."
    ],
    "checks": [
      "예시의 첫 문단 말투를 고치고 이미 맞는 구조와 둘째 문단은 유지한다",
      "별도 요청의 문장 수 모순을 찾아 우선 조건에 맞게 수정한다",
      "프롬프트의 충돌 해소와 실제 응답의 개선을 구분한다"
    ],
    "example": "첫 문단을 “행사를 안내해요. 오늘 신청을 받아요.”로 바꾸고 둘째 문단은 유지할 수 있습니다. 이렇게 하면 지시와 예시의 말투는 맞출 수 있습니다. AI가 실제로 지시를 더 잘 따르는지는 응답을 받아 봐야 알 수 있습니다. 별도 요청은 두 문단에 각각 두 문장과 세 문장을 배치하도록 고치면 전체 다섯 문장을 유지할 수 있습니다. 우선순위를 모르는 상황에서는 임의로 요구를 버리지 말고 먼저 확인해야 합니다.",
    "extra": "“두 문단·각 두 문장·전체 다섯 문장”은 동시에 가능할까요? 예시 충돌과 요구 자체의 모순을 구분해 보세요.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“요구도 예시에 맞춰 합니다체로 바꿉니다.”",
        "reason": "원래 사용자의 말투 요구를 바꿨습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“예시의 말투만 고칩니다.”",
        "reason": "예시 충돌은 해결했지만 별도 요청의 문장 수 모순도 고쳐야 합니다."
      }
    ],
    "draftHint": "선택 또는 판정: …\n그렇게 판단한 근거: …\n프롬프트나 수정안: …"
  },
  {
    "title": "같은 기준으로 응답 비교하기",
    "phase": "분석 · 측정 기준",
    "question": "비교 기준이 달라지면 결과를 믿을 수 있을까요?",
    "caseIndex": 1,
    "lesson": [
      "두 응답 중 어느 쪽이 조건을 더 잘 지켰는지 비교하려면, 양쪽에 같은 검사 기준을 적용해야 합니다. 문장 수처럼 쉬워 보이는 기준도 표지와 종결 부호를 어떻게 취급하는지에 따라 달라질 수 있습니다.",
      "앱에서는 논문에서 매긴 점수와 검사 방법을 보완해 다시 매긴 점수를 따로 보여 줍니다. 두 점수가 다르다면, 점수가 높은 쪽을 고르기 전에 어떤 검사 기준 때문에 달라졌는지 응답과 함께 확인하세요."
    ],
    "task": "요구: 두 문장, 해요체. 응답 A: “무엇을 가져오나요? 책을 가져와요.” 응답 B: “Q. 무엇을 가져오나요? A. 책을 가져와요.” 검사기가 A는 두 문장, B는 네 문장이라고 했습니다. 두 응답을 비교할 문장 수 기준을 정하세요.",
    "prompts": [
      "Q.·A.를 문장으로 셀지 결정하고 근거를 적으세요.",
      "같은 기준으로 A/B를 판정하고, 검사기 결과와 다르면 어떻게 기록할지 적으세요."
    ],
    "checks": [
      "Q.·A.가 표지인지 문장인지 기준을 밝힌다",
      "두 응답에 같은 기준을 적용한다",
      "원래 검사 결과를 지우지 않고 보완 판정과 구분한다"
    ],
    "example": "Q.·A.를 역할 표지로 보면 A/B 모두 두 문장으로 해석할 수 있습니다. 원검사 B=4문장과 보완 판정 B=2문장을 구분해 남깁니다. 이 사례는 설명용이며 모든 문장 판별 문제를 해결하지는 않습니다.",
    "extra": "인용문이나 소수점이 포함되면 어떤 판정 차이가 생길 수 있을까요? 새 기준을 정할 때 전체 응답에 똑같이 적용해야 하는 이유를 설명해 보세요.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“B만 두 문장으로 바꿔 점수를 저장합니다.”",
        "reason": "검사 기준과 원판정이 남지 않습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“Q./A.를 제외하면 둘 다 두 문장입니다.”",
        "reason": "판정은 설명했지만 원결과와 보완 판정을 구분해 남겨야 합니다."
      }
    ],
    "draftHint": ""
  },
  {
    "title": "하나만 바꾸는 비교 설계하기",
    "phase": "설계 · 통제",
    "question": "골격을 추가한 효과만 보려면 무엇을 고정할까요?",
    "caseIndex": 2,
    "lesson": [
      "골격을 추가한 응답이 더 나았더라도 모델이나 과제까지 바뀌었다면 무엇의 영향인지 구분하기 어렵습니다. 바꾸는 요소와 고정하는 요소를 먼저 정해야 합니다.",
      "같은 요청에도 매번 다른 응답이 나올 수 있습니다. 한 번 비교해서 잘됐다고 항상 효과가 있다고 말할 수는 없습니다. 실패하거나 응답을 받지 못한 경우도 함께 기록하세요."
    ],
    "task": "다음 두 프롬프트는 빈 틀의 효과를 비교하려는 초안입니다. A: “제품 소개를 장점/주의점 두 소제목, 각각 두 문장, 해요체로 써 줘.” B: “같은 제품 소개를 장점/주의점 두 소제목, 각각 한 문장, 해요체로 써 줘. [장점]\n[문장]\n[주의점]\n[문장]” 두 조건에서 빈 틀 외에 달라진 점을 찾고 B를 고치세요. 이어서 모델·검사 기준·반복·오류 기록을 포함한 짧은 비교 계획을 쓰세요.",
    "prompts": [
      "바꿀 요소 하나와 고정할 요소들을 적으세요.",
      "비교할 두 조건, 반복 계획, 검사 기준, 실패·누락 기록 방법을 간단히 작성하세요."
    ],
    "checks": [
      "문장 수까지 달라진 문제를 찾고 B를 각각 두 문장으로 고친다",
      "과제·모델·설정·검사 기준은 같게 두고 빈 틀만 바꾼다",
      "반복과 실패·누락 기록 방법을 포함한다"
    ],
    "example": "B도 소제목마다 두 문장을 요구하고 빈칸을 두 개씩 둡니다. 같은 제품 정보·모델·설정으로 실행하고, 소제목·문장 수·말투를 같은 기준으로 검사합니다. 반복 횟수와 순서를 미리 정하고 응답과 오류를 모두 남깁니다. 골격과 문장 수를 함께 바꾼 원래 비교로는 골격의 영향만 알 수 없습니다.",
    "extra": "같은 비교를 다른 과제에서도 한다면 결과를 어떻게 나눠 볼까요? 직접 실행하려면 ‘나의 실험’을 이용할 수 있습니다. API 실행에는 비용이 듭니다.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“B에 빈 틀이 있으니 그대로 비교합니다.”",
        "reason": "문장 수도 달라 빈 틀의 영향만 비교할 수 없습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“B의 문장 수를 고치고 같은 모델로 비교합니다.”",
        "reason": "설정·판정 기준·반복·오류 기록까지 정해야 합니다."
      }
    ],
    "draftHint": ""
  },
  {
    "title": "평균과 한 번의 성공 구분하기",
    "phase": "해석 · 범위",
    "question": "평균 준수율이 같으면 같은 결과일까요?",
    "caseIndex": 5,
    "lesson": [
      "각 응답이 조건을 평균적으로 얼마나 지켰는지와, 모든 조건을 지킨 응답이 몇 개인지는 서로 다른 정보입니다. 한 번 비교한 결과와 여러 번 실행한 결과도 나눠서 살펴봐야 합니다.",
      "논문에서도 모델에 따라 결과가 달랐습니다. 어떤 모델과 과제에서 나온 결과인지 함께 밝혀야 하며, 다른 모델이나 작업에서도 같을 것이라고 단정하면 안 됩니다."
    ],
    "task": "각 응답에서 네 조건을 검사했습니다. A는 5회 모두 응답을 받았고 준수 개수는 [4,3,3,2,4]입니다. B도 5회 시도했지만 한 번 오류가 났고 받은 응답은 [4,4,3,1]입니다. 받은 응답만 대상으로 두 준수율을 계산하고, 오류는 따로 기록하세요. 계산 연습을 위해 만든 자료입니다.",
    "prompts": [
      "A/B의 평균 규칙 준수율과 모든 조건을 지킨 응답 비율을 계산하세요.",
      "지금 말할 수 있는 차이와, 더 확인해야 할 범위를 한두 문장으로 적으세요."
    ],
    "checks": [
      "받은 응답의 평균 규칙 준수율 A=80%, B=75%를 계산한다",
      "완전 준수 응답 비율 A=40%, B=50%와 각 분모를 밝힌다",
      "B의 시도 5회·응답 4회·오류 1회를 남기고 우열을 단정하지 않는다"
    ],
    "example": "A는 16/20=80%, 완전 준수는 2/5=40%입니다. B는 받은 네 응답에서 12/16=75%, 완전 준수는 2/4=50%입니다. B는 시도 5회 중 응답 4회·오류 1회로 따로 기록합니다. 평균은 A, 받은 응답의 완전 준수 비율은 B가 높습니다. 어느 지표가 필요한지와 오류의 영향을 함께 봐야 하며, 이 자료만으로 일반적인 우열을 정할 수 없습니다.",
    "extra": "완전한 형식 준수가 중요한 상황이라면 어떤 지표를 먼저 볼까요? 반대로 일부 위반의 비용이 다르면 어떤 추가 정보가 필요할까요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“B는 5회 중 2회 완전 준수라 40%입니다.”",
        "reason": "이 과제는 받은 응답을 분모로 정했습니다. 응답을 못 받은 경우는 따로 기록합니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“평균 A80%/B75%, 완전 준수 A40%/B50%입니다.”",
        "reason": "계산 외에도 B의 오류와 일반화할 수 없는 범위를 밝혀야 합니다."
      }
    ],
    "draftHint": ""
  },
  {
    "title": "새 과제에서 방법을 직접 선택하기",
    "phase": "탐구 · 독립 설계",
    "question": "표로 답을 받고 싶다면 어떻게 요청할까요?",
    "caseIndex": null,
    "lesson": [
      "문단 대신 표가 필요한 상황입니다. 먼저 열과 데이터 행 수, 표 밖 설명 여부처럼 확인할 조건을 정하세요. 논문에서 쓴 문단 수를 그대로 가져올 필요는 없습니다.",
      "지시만 쓸지, 빈 틀이나 예시를 더할지는 직접 고르세요. 선택한 이유를 적고 실제 응답에서 무엇을 확인할지 정합니다. 표에서도 같은 효과가 나타나는지는 논문에서 확인하지 않았습니다."
    ],
    "task": "품목과 수량을 “품목/수량” 두 열, 데이터 세 행의 표로 요청하려 합니다. 표 밖 설명은 없어야 합니다. 요청 방법을 골라 프롬프트를 쓰세요. 아래의 연습용 응답도 조건별로 검사하고, 필요한 부분만 고치세요. 이 응답은 여러분의 프롬프트를 실행한 결과가 아닙니다.",
    "prompts": [
      "확인할 조건을 적고, 요청 방법을 고른 이유를 설명하세요.",
      "프롬프트와 검사 기준을 쓰고, 조건을 어겼을 때 비교해 볼 수정안 하나를 적으세요."
    ],
    "checks": [
      "두 열·데이터 세 행·표 밖 설명 없음이라는 조건을 전달한다",
      "제시된 응답에서 데이터 두 행과 표 밖 설명을 찾아 수정한다",
      "머리글·구분선을 데이터에서 제외하고 수정안의 효과를 단정하지 않는다"
    ],
    "example": "제시된 표는 두 열은 지켰지만 데이터가 두 행이고 표 아래 설명이 있습니다. 원정보 “펜 2개, 공책 1개, 파일 3개”에 맞춰 파일 행을 추가하고 표 밖 설명을 지웁니다. 요청에는 데이터 세 행과 표 밖 설명 금지를 명시할 수 있습니다. 응답을 직접 고친 사실과 프롬프트 수정의 효과는 구분해야 합니다.",
    "extra": "다음에는 같은 정보를 목록으로 출력하도록 바꾸어 보세요. 표 골격을 그대로 붙이면 어떤 충돌이 생길까요?",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“머리글과 구분선까지 네 행이므로 한 행을 지웁니다.”",
        "reason": "데이터 행은 두 개입니다. 지우면 요구에서 더 멀어집니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“파일 행을 추가합니다.”",
        "reason": "표 밖 설명도 지워야 합니다."
      }
    ],
    "draftHint": ""
  },
  {
    "title": "며칠 뒤 내 작업에 다시 적용하기",
    "phase": "유지 · 재적용",
    "question": "다른 요청에도 배운 방법을 적용할 수 있나요?",
    "caseIndex": null,
    "lesson": [
      "가능하면 앞 차시를 마친 뒤 3~7일 정도 지나서 풀어 보세요. 이전 답을 보지 않고 얼마나 기억하는지 확인하는 연습입니다. 원하면 지금 진행해도 됩니다.",
      "이번 과제에서도 원하는 형식을 프롬프트에 적고, 응답이 그 조건을 지켰는지 확인해 보세요. 글의 전반적인 품질이나 사실 확인 능력까지 평가하지는 않습니다."
    ],
    "task": "먼저 아래의 처음 보는 응답을 검사하세요. 요구는 번호 목록 세 항목, 항목마다 한 문장, 합니다체입니다. 조건별 판정과 필요한 수정안을 적으세요. 그다음 실제로 AI에게 부탁할 작업 하나를 골라 형식 조건 세 가지와 프롬프트를 작성하세요. 아직 직접 실행하지 않았다면 “내 작업은 실행 전”이라고 적으세요.",
    "prompts": [
      "작업과 확인할 조건 세 가지, 선택한 요청 방법을 적으세요.",
      "프롬프트를 쓰고, 응답이 조건을 어겼을 때 바꿀 부분과 비교 방법을 적으세요."
    ],
    "checks": [
      "새 응답의 항목 수·문장 수·말투를 각각 판정하고 필요한 부분만 고친다",
      "내 작업의 조건 세 가지와 요청 방법을 정하고 선택 이유를 설명한다",
      "연습 응답의 검사 결과와 내 작업의 실행 여부를 구분한다"
    ],
    "example": "연습 응답은 세 항목이지만 둘째 항목이 두 문장이고 첫째 항목은 해요체입니다. 첫째 항목은 “신청서를 제출합니다.”로, 둘째 항목은 “자료를 확인한 뒤 파일을 저장합니다.”로 고칠 수 있습니다. 셋째 항목은 유지합니다. 내 작업은 별도로 정하고, 실행하지 않았다면 응답을 검사한 것처럼 기록하지 않습니다.",
    "extra": "선택한 내 작업을 실제로 실행했다면 원응답을 보관하고 조건별로 검사해 보세요. 무료로 쓰는 AI나 ‘나의 실험’을 이용할 수 있습니다. API 실행은 필수가 아닙니다.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“목록이 세 개이므로 통과입니다.”",
        "reason": "항목마다 한 문장인지, 합니다체인지도 확인해야 합니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“첫 항목의 말투를 고칩니다.”",
        "reason": "둘째 항목의 두 문장도 한 문장으로 고쳐야 합니다."
      }
    ],
    "draftHint": ""
  }
];
let courseIndex=-1;
function courseState(){if(!saved.course20||typeof saved.course20!=='object')saved.course20={};return saved.course20;}
function courseEntry(){const all=courseState();return all[courseIndex]||(all[courseIndex]={fields:{},checks:[],history:[],status:'draft'});}
function courseField(key,label,value,placeholder=''){return `<label class="field" for="course-${key}">${esc(label)}</label><textarea id="course-${key}" data-course-field="${key}" maxlength="12000" placeholder="${esc(placeholder)}">${esc(value||'')}</textarea>`;}
function renderCourse(){const all=courseState();
 if(courseIndex<0){const done=Object.values(all).filter(x=>x.status==='reviewed').length;
 $('#main').innerHTML=`<section class="hero"><div><div class="eyebrow">프롬프트 실험실 · 단계별 학습 과정</div><h1>조건을 읽는 것에서<br>스스로 설계하는 것까지.</h1><p class="muted">프롬프트의 구조적 요소와 지시 준수에 집중합니다. 예시·빈 골격·충돌을 배우고, 다른 출력 구조에서는 효과를 확인할 대상으로 남깁니다. 여러 날에 걸쳐 짧은 설계와 수정을 쌓아 보세요.</p><p class="note">기반 논문 · ${esc(DATA.title)}</p></div><div class="hero-aside"><strong>${done}/8</strong><small>검토를 마친 차시<br>숙련도 점수가 아닙니다.</small></div></section><div class="card"><h2>한 번에 핵심 질문 하나, 약 20분</h2><p class="note">읽기 3분 → 설계 7분 → 해설 대조·수정 7분 → 정리 3분. 강제 타이머는 없습니다.</p><p>핵심 활동은 회차당 20분 전후를 목표로 합니다. 8차시를 여러 날에 나누어 진행하세요. 실제 소요 시간은 아직 측정하지 않았으며, 20분이 지나면 초안으로 저장하고 다음에 이어가도 됩니다. 선택 탐구는 완료 조건이 아닙니다.</p><div class="steps"><span>분석하고 초안 쓰기</span><span>근거·반례와 대조하기</span><span>수정하고 이유 남기기</span></div><p>앞 차시는 설명과 예시를 제공하고, 뒤 차시는 도움 없이 다른 요구를 설계합니다. 버튼을 누른 횟수나 머문 시간으로 학습 완료를 판정하지 않습니다.</p><div class="actions"><button class="primary" id="course-resume">${Object.keys(all).length?'이어서 학습':'1차시 시작'}</button><button id="course-export">학습 과정 백업</button><label class="import-label">백업 불러오기<input id="course-import" type="file" accept="application/json,.json"></label></div><p class="note">입력 내용은 이 브라우저에 자동 저장합니다. 기기를 바꾸기 전에는 백업 파일을 내려받으세요.</p></div>${saved.course&&Object.keys(saved.course).length?'<div class="result"><p>개편 전 과정의 기록은 보존했습니다. 새 과제의 답안으로 옮기지 않았습니다.</p><button id="legacy-course-export">이전 과정 기록 내려받기</button></div>':''}<div class="course-grid">${COURSE.map((u,i)=>`<button class="course-card" data-course-open="${i}"><span class="eyebrow">${String(i+1).padStart(2,'0')} · ${esc(u.phase)}</span><h2>${esc(u.title)}</h2><p>${esc(u.question)}</p><small>${esc(u.minutes)} · ${all[i]?.status==='reviewed'?'검토 완료':all[i]?'작성 중':'시작 전'}</small></button>`).join('')}</div>`;
 document.querySelectorAll('[data-course-open]').forEach(b=>b.onclick=()=>openCourse(+b.dataset.courseOpen));
 if(saved.course&&Object.keys(saved.course).length)$('#legacy-course-export').onclick=()=>download('prompt-lab-course-legacy.json',JSON.stringify({format:'prompt-lab-course',version:1,course:saved.course},null,2),'application/json');
 $('#course-resume').onclick=()=>openCourse(COURSE.findIndex((u,i)=>all[i]?.status!=='reviewed')<0?7:COURSE.findIndex((u,i)=>all[i]?.status!=='reviewed'));
 $('#course-export').onclick=()=>download('prompt-lab-course.json',JSON.stringify({format:'prompt-lab-course',version:2,course:all},null,2),'application/json');
 $('#course-import').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(file.size>1500000){notify('백업은 1.5MB 이하 파일만 읽습니다.');return;}try{const data=JSON.parse(await file.text());const clean=validateCourseBackup(data);if(!confirm('현재 단계별 학습 기록을 이 백업으로 바꿀까요? 필요하면 먼저 백업하세요.'))return;saved.course20=clean;persist();renderCourse();notify('백업을 불러왔습니다.');}catch(err){notify('읽을 수 없는 백업입니다. 프롬프트 실험실 학습 과정 JSON을 선택하세요.');}};return;}
 const u=COURSE[courseIndex],v=courseEntry(),f=v.fields;
 $('#main').innerHTML=`<div class="section-title"><button id="course-home">← 전체 과정</button><span class="tag">${courseIndex+1} / 8 · ${esc(u.phase)}</span></div><h1>${esc(u.title)}</h1><p class="muted">${esc(u.question)} · 예상 ${esc(u.minutes)}</p><div class="course-work"><section><div class="card"><h2>1. 설명 읽기</h2>${u.lesson.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="note">핵심 원리는 논문에 근거합니다. 아래 새 과제는 교육용으로 구성했으며, 다른 형식에서의 효과는 별도로 확인해야 합니다.</p>${u.caseIndex!==null?`<div class="result"><strong>연구에서 확인한 자료</strong><p>${esc(DATA.cases[u.caseIndex].lesson)}</p><p class="note">${DATA.cases[u.caseIndex].aggregate.map(a=>esc(a["조건명"])+": "+esc(a["준수율(%)"])+"% ("+esc(a["짝 수"])+"쌍)").join(" · ")}<br>평균 규칙 준수율이며 글 전체 성공률은 아닙니다.</p></div><details><summary>선택 · 원자료 전체 읽기 · 사례 ${u.caseIndex+1}</summary>${courseEvidence(u.caseIndex)}</details>`:''}</div><div class="card"><h2>2. 직접 설계하기</h2><div class="task-brief">${esc(u.task).replace(/\n/g,'<br>')}</div>${u.prompts.map((p,i)=>courseField('answer'+i,p,f['answer'+i])).join('')}<div class="actions"><button class="primary" id="course-draft">${v.initial?'검토 단계 다시 열기':'초안 보존하고 검토 기준 열기'}</button><button id="course-save">지금 저장</button></div><p id="course-save-status" role="status" class="note">${v.updated?'마지막 저장: '+esc(new Date(v.updated).toLocaleString('ko-KR')):'입력하면 자동 저장됩니다.'}</p></div><div id="course-review"></div></section><aside><div class="card course-sticky"><h3>이번에 작성할 것</h3><p>짧은 초안 하나 + 수정본 + 수정 이유 한두 줄</p><p class="note">형식적으로 글을 채웠는지는 확인할 수 있어도, 직접 쓴 답이 맞는지 자동으로 채점하지는 않습니다.</p><h3>확인할 기준</h3><ul>${u.checks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>다음 시간까지</h3><p>${esc(u.transfer)}</p>${v.initial?`<details><summary>보존된 첫 초안</summary><div class="response">${esc(v.initial)}</div></details>`:''}${v.history.length?`<details><summary>검토 기록 ${v.history.length}개</summary>${v.history.map(h=>`<p><small>${esc(new Date(h.date).toLocaleString('ko-KR'))}</small></p><div class="response">${esc(h.revision)}</div><p>${esc(h.reason)}</p>`).join('')}</details>`:''}</div></aside></div>`;
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
 $('#course-review').innerHTML=`<div class="card"><h2>3. 초안을 대조하고 고치기</h2><p>먼저 자신의 초안에서 아래 기준을 만족하는 구절을 찾아 보세요. 설명을 읽고 넘어가는 것과 직접 수정하는 것은 다릅니다.</p><details><summary>검토용 해설 열기 · 유일한 정답은 아닙니다</summary><div class="result">${esc(u.example)}</div></details>${courseField('revision','수정한 최종 설계',f.revision,'수정한 설계를 적으세요. 바꾸지 않았다면 그대로 남기고 이유를 적어도 됩니다.')}${courseField('reason','무엇을 왜 바꾸었나요? 바꾸지 않았다면 그 근거는 무엇인가요?',f.reason)}<details class="optional-work"><summary>선택 탐구 · 오늘 끝내지 않아도 됩니다</summary><p>${esc(u.extra)}</p>${courseField('counter','선택 탐구 메모',f.counter)}</details><fieldset><legend>내가 근거를 찾아 확인한 항목</legend>${u.checks.map((x,i)=>`<label class="rule"><input type="checkbox" data-course-check="${i}" ${v.checks.includes(i)?'checked':''}>${esc(x)}</label>`).join('')}</fieldset><p class="note">이 체크는 자기검토 기록입니다. 정답·숙련도 인증이 아닙니다. 가능하면 동료와 서로 근거를 대조하세요.</p><div class="actions"><button class="primary" id="course-complete">이번 검토 기록 남기기</button>${courseIndex<7?'<button id="course-next">다음 차시 살펴보기 →</button>':''}</div><p id="course-reviewed" role="status"></p></div>`;
 bindCourseFields();document.querySelectorAll('[data-course-check]').forEach(el=>el.onchange=()=>{const i=+el.dataset.courseCheck;v.checks=el.checked?[...new Set([...v.checks,i])]:v.checks.filter(x=>x!==i);v.status='draft';persist();});
 $('#course-complete').onclick=()=>{if(['revision','reason'].some(k=>!String(f[k]||'').trim())||v.checks.length!==u.checks.length){notify('수정본과 짧은 수정 이유를 적고, 검토한 기준을 확인해 주세요. 아직 어렵다면 초안으로 저장해 두어도 됩니다.');return;}v.history.push({date:new Date().toISOString(),revision:f.revision,reason:f.reason,counter:f.counter});v.history=v.history.slice(-20);v.status='reviewed';v.updated=new Date().toISOString();if(persist())$('#course-reviewed').textContent='검토 기록을 남겼습니다. 숙련도 판정은 아니며, 다음 차시에서 다른 요구에 적용해 보세요.';};
 if(courseIndex<7)$('#course-next').onclick=()=>openCourse(courseIndex+1);
}
function validateCourseBackup(data){
 if(data?.format!=='prompt-lab-course'||data.version!==2||!data.course||typeof data.course!=='object')throw Error('format');
 const result={};const text=x=>typeof x==='string'?x.slice(0,12000):'';
 for(let i=0;i<8;i++){const v=data.course[i];if(!v)continue;if(!v.fields||typeof v.fields!=='object')throw Error('fields');const fields={};for(const k of ['recall','answer0','answer1','answer2','revision','reason','counter'])fields[k]=text(v.fields[k]);result[i]={fields,checks:Array.isArray(v.checks)?[...new Set(v.checks.filter(n=>Number.isInteger(n)&&n>=0&&n<3))]:[],history:Array.isArray(v.history)?v.history.slice(-20).filter(h=>h&&typeof h==='object').map(h=>({date:text(h.date),revision:text(h.revision),reason:text(h.reason),counter:text(h.counter)})):[],status:v.status==='reviewed'?'reviewed':'draft',initial:typeof v.initial==='string'?v.initial.slice(0,40000):'',updated:text(v.updated)};}
 return result;
}
