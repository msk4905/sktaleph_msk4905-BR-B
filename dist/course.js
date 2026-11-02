'use strict';
const COURSE=[
  {
    "title": "원하는 글의 조건 정하기",
    "phase": "기초 · 연구 질문",
    "question": "AI에게 무엇을 구체적으로 알려 줘야 할까요?",
    "caseIndex": 0,
    "lesson": [
      "AI에게 보낼 요청을 프롬프트라고 합니다. “읽기 쉽게 써 줘”라고만 하면 원하는 글의 모습이 충분히 전달되지 않을 수 있습니다. 누가 어디에서 읽을 글인지 먼저 생각해 보세요.",
      "그다음 “두 문장으로 쓰기”, “각 준비물 앞에 번호 붙이기”처럼 글이 지켜야 할 조건을 정합니다. 문장 수, 항목 수, 말투처럼 글의 형태에 관한 조건을 이 과정에서는 형식 조건이라고 부릅니다.",
      "원하는 형식과 내용의 정확성은 따로 확인해야 합니다. 예를 들어 두 문장으로 썼더라도 날짜나 장소가 틀릴 수 있습니다. 형식은 정한 조건과 비교하고, 내용은 처음 제공한 정보와 비교하세요."
    ],
    "task": "친구가 독서 모임 안내문을 써 달라고 부탁했습니다. 알려 준 내용은 “토요일 오후 2시, 도서관 2층, 준비물은 책 한 권”입니다.\n\n1. 누가 어디에서 읽을 안내문인지 정하세요.\n2. 문장 수나 말투 등 형식 조건을 세 가지 정하세요.\n3. AI에게 보낼 요청을 쓰세요.\n4. 답을 받으면 세 조건과 모임 정보를 각각 어떻게 확인할지 적으세요.",
    "prompts": [
      "읽을 사람과 사용할 곳을 정하고, 그에 맞는 형식 조건 세 가지를 쓰세요.",
      "프롬프트를 작성하고, 각 조건과 처음 제공한 정보를 어떻게 확인할지 적으세요."
    ],
    "checks": [
      "글을 읽을 사람과 사용할 곳에 맞춰 형식 조건 세 가지를 정했나요?",
      "세 조건을 함께 지킬 수 있으며, 각 조건의 확인 방법을 적었나요?",
      "날짜·장소·준비물을 처음 받은 정보와 따로 비교하도록 했나요?"
    ],
    "example": "단체 채팅방의 친구에게 보낼 글이라면 “제목 없이, 두 문장으로, 해요체로 써 줘”라고 정할 수 있습니다. 제목 유무·본문 문장 수·문장 끝말을 확인합니다. 날짜와 장소, 준비물은 처음 제공한 정보와 대조합니다. 두 문장만이 정답은 아닙니다. 사용할 곳에 맞는 이유가 있고 실제로 검사할 수 있는 조건이면 됩니다.",
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
        "reason": "형식 조건은 두 가지만 정했습니다. 조건 하나를 더 정하고, 사용할 곳에 맞는 이유와 원래 정보의 확인 방법도 적어야 합니다."
      }
    ],
    "draftHint": "사용할 곳: …\n형식 조건 세 가지: …\n프롬프트: …\n확인 방법: …"
  },
  {
    "title": "지시만 쓸지, 예시나 빈 틀을 더할지 고르기",
    "phase": "기초 · 예시와 빈 틀",
    "question": "이 요청에는 예시나 빈 틀이 필요할까요?",
    "caseIndex": 3,
    "lesson": [
      "지시문은 AI에게 해야 할 일을 설명하는 문장입니다. “두 문장으로 써 줘”가 그 예입니다. 완성 예시는 원하는 글을 직접 보여 주는 것이고, 빈 틀은 “[일시를 알리는 문장]. [준비물을 알리는 문장].”처럼 내용이 들어갈 자리를 보여 주는 것입니다.",
      "문장 수나 말투를 지시만으로 잘 전달할 수 있다면 그것으로 시작해도 됩니다. 소제목 순서나 문단 배치를 자꾸 놓친다면 빈 틀을 더해 볼 수 있습니다. 특정한 말투나 표현 방식을 보여 주려면 완성 예시를 고려할 수 있습니다.",
      "논문에서는 예시나 빈 틀을 더했을 때 지시를 더 잘 지킨 경우가 있었습니다. 그렇다고 모든 요청에 예시가 필요한 것은 아닙니다. 무엇을 개선하려는지 정하고, 실제로 받은 응답을 비교하세요."
    ],
    "task": "다음 두 상황에서 AI에게 요청할 방법을 각각 골라 보세요.\n\n가: 두 문장, 해요체로 요청한 안내문이 지금까지 두 조건을 잘 지켰습니다.\n나: “접수” 다음에 “준비물”을 쓰라고 했지만 소제목 순서가 자꾸 뒤바뀝니다.\n\n1. 각 상황에서 지시만 쓸지, 빈 틀을 더할지, 완성 예시를 더할지 고르고 이유를 적으세요.\n2. 나의 상황에서 실제로 보낼 프롬프트를 쓰세요.\n3. 받은 응답에서 무엇을 확인할지 적으세요.",
    "prompts": [
      "방법을 고른 이유와 실제로 보낼 프롬프트를 적으세요.",
      "응답에서 확인할 조건과, 지키지 않았을 때 바꿀 요소 하나를 적으세요."
    ],
    "checks": [
      "가의 상황에서 요청 방법을 유지하거나 바꾸려는 이유를 설명했나요?",
      "나의 상황에서 소제목 순서를 전달할 방법을 고르고 이유를 설명했나요?",
      "응답의 소제목과 순서를 검사하도록 했으며, 실행 전에 효과를 단정하지 않았나요?"
    ],
    "example": "가에서는 현재 지시를 유지하고 다음 응답도 두 문장인지, 해요체인지 확인할 수 있습니다. 나에서는 “접수와 준비물 두 소제목을 이 순서로 써 줘”라고 더 분명히 적거나, 두 소제목을 그 순서로 놓은 빈 틀을 더해 볼 수 있습니다. 완성 예시를 고른다면 무엇을 보여 주려는지 설명하세요. 어느 방법이 더 나은지는 같은 과제와 모델에서 응답을 받아 비교해야 합니다.",
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
    "title": "서로 맞지 않는 조건과 예시 고치기",
    "phase": "분석 · 충돌",
    "question": "요청 자체가 모순인가요, 예시가 요청과 다른가요?",
    "caseIndex": 4,
    "lesson": [
      "“두 문단으로 쓰기”, “문단마다 두 문장 쓰기”, “전체를 다섯 문장으로 쓰기”는 동시에 지킬 수 없습니다. 두 문단에 두 문장씩 쓰면 네 문장이기 때문입니다. 이때는 무엇을 우선할지 정한 뒤 조건을 고쳐야 합니다.",
      "요청한 조건끼리는 맞아도 예시가 다를 수 있습니다. 해요체를 요청하면서 합니다체 예시를 붙이면 서로 다른 말투를 보여 주게 됩니다. 이 경우에는 원래 요청을 유지하면서 예시를 고칠 수 있습니다.",
      "논문에서는 일부 모델과 실험 조건에서 지시와 예시의 충돌이 지시 준수에 영향을 주었습니다. 충돌을 고쳤다고 응답이 반드시 좋아지는 것은 아닙니다. 실제 응답이 달라지는지는 따로 비교해야 합니다."
    ],
    "task": "첫 번째 요청은 “두 문단으로 쓰고, 문단마다 두 문장을 넣고, 모두 해요체로 써 줘”입니다. 붙이려는 예시는 다음과 같습니다.\n\n행사를 안내합니다. 오늘 신청을 받습니다.\n\n노트북을 가져오세요. 준비물은 이게 전부예요.\n\n1. 요청과 다른 부분만 고치고, 이미 맞는 부분은 남기세요.\n2. 별도 요청인 “두 문단, 문단마다 두 문장, 전체 다섯 문장”의 모순을 찾으세요. 요청자가 전체 다섯 문장을 우선하겠다고 했다면, 나머지 조건을 어떻게 고칠지 적으세요.\n3. 요청과 예시를 고친 것만으로 AI의 답도 더 좋아졌다고 말할 수 있는지 설명하세요.",
    "prompts": [
      "충돌하는 부분과 이미 요구에 맞는 부분을 나누세요.",
      "수정한 예시를 쓰고, 어떤 조건을 유지했는지 한 줄 적으세요."
    ],
    "checks": [
      "예시의 첫 문단 말투를 고치고, 이미 맞는 문장 수와 둘째 문단은 유지했나요?",
      "별도 요청의 문장 수 모순을 찾고, 전체 다섯 문장을 유지하도록 고쳤나요?",
      "프롬프트를 고친 것과 AI 응답이 좋아졌는지를 구분했나요?"
    ],
    "example": "첫 문단을 “행사를 안내해요. 오늘 신청을 받아요.”로 바꾸고 둘째 문단은 유지할 수 있습니다. 이렇게 하면 지시와 예시의 말투는 맞출 수 있습니다. AI가 실제로 지시를 더 잘 따르는지는 응답을 받아 봐야 알 수 있습니다. 별도 요청은 두 문단에 각각 두 문장과 세 문장을 배치하도록 고치면 전체 다섯 문장을 유지할 수 있습니다. 우선순위를 모르는 상황에서는 임의로 요구를 버리지 말고 먼저 확인해야 합니다.",
    "extra": "요청자가 전체 문장 수보다 “문단마다 두 문장”을 우선하겠다고 했다면, 어떤 조건을 바꿔야 할까요?",
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
    "title": "같은 기준으로 응답 검사하기",
    "phase": "분석 · 측정 기준",
    "question": "문장 수를 다르게 세었다면 두 결과를 비교해도 될까요?",
    "caseIndex": 1,
    "lesson": [
      "두 프롬프트의 응답을 비교할 때는 검사 방법도 같아야 합니다. 한쪽은 본문의 문장을 세고 다른 쪽은 목록 번호의 마침표까지 센다면, 결과 차이가 프롬프트 때문인지 검사 방법 때문인지 알기 어렵습니다.",
      "문장 수를 셀 때 번호나 Q./A. 같은 표시를 어떻게 처리할지 먼저 정하세요. 기준을 고쳤다면 비교 대상 전체를 다시 확인하고, 처음 결과와 수정한 결과를 함께 남깁니다.",
      "실제 응답 비교 화면에서는 논문의 채점 결과와 앱이 다시 검사한 결과를 구분해서 보여 줍니다. 두 결과가 다르면 어떤 표현을 다르게 셌는지 응답에서 찾아보세요."
    ],
    "task": "AI에게 두 문장의 해요체 답변을 요청했습니다. 두 응답은 다음과 같습니다.\n\nA: 무엇을 가져오나요? 책을 가져와요.\nB: Q. 무엇을 가져오나요? A. 책을 가져와요.\n\n프로그램은 A를 두 문장, B를 네 문장으로 셌습니다.\n\n1. Q.와 A.를 문장 수에 넣을지 정하고 이유를 적으세요.\n2. 정한 기준으로 두 응답의 문장 수를 다시 세세요.\n3. 프로그램의 처음 결과와 새 결과를 어떻게 기록할지 적으세요.",
    "prompts": [
      "Q.·A.를 문장으로 셀지 결정하고 근거를 적으세요.",
      "같은 기준으로 A/B를 판정하고, 검사기 결과와 다르면 어떻게 기록할지 적으세요."
    ],
    "checks": [
      "Q.와 A.를 문장 수에 넣을지 정하고 이유를 설명했나요?",
      "A와 B의 문장 수를 같은 기준으로 셌나요?",
      "프로그램의 처음 결과와 새로 센 결과를 구분해서 남겼나요?"
    ],
    "example": "Q.와 A.를 질문과 답변을 표시하는 글자로 보고 문장 수에서 제외하면, A와 B 모두 두 문장입니다. B의 기록에는 “처음 프로그램 결과: 네 문장 / Q.와 A.를 제외한 결과: 두 문장”이라고 남길 수 있습니다. 기준을 바꾼 이유도 함께 적습니다.",
    "extra": "인용문이나 소수점이 포함되면 어떤 판정 차이가 생길 수 있을까요? 새 기준을 정할 때 전체 응답에 똑같이 적용해야 하는 이유를 설명해 보세요.",
    "minutes": "약 20분 · 예상",
    "transfer": "고친 답안과 이유를 저장하세요. 추가 문제는 나중에 풀어도 됩니다.",
    "reviewExamples": [
      {
        "label": "다시 살펴볼 답",
        "answer": "“B만 두 문장으로 바꿔 점수를 저장합니다.”",
        "reason": "검사 기준과 처음 판정이 남지 않습니다."
      },
      {
        "label": "일부를 확인한 답",
        "answer": "“Q./A.를 제외하면 둘 다 두 문장입니다.”",
        "reason": "판정은 설명했지만 처음 결과와 보완 판정을 구분해 남겨야 합니다."
      }
    ],
    "draftHint": ""
  },
  {
    "title": "한 가지만 바꿔서 비교하기",
    "phase": "설계 · 통제",
    "question": "빈 틀 때문에 결과가 달라졌는지 어떻게 확인할까요?",
    "caseIndex": 2,
    "lesson": [
      "빈 틀의 효과를 알고 싶다면 빈 틀을 넣은 요청과 넣지 않은 요청을 비교합니다. 이때 모델과 과제, 요청한 조건, 실행 설정, 검사 방법은 같게 맞춥니다.",
      "예를 들어 빈 틀을 넣으면서 문장 수까지 줄이면, 어느 변화 때문에 결과가 달라졌는지 구분하기 어렵습니다. 비교하려는 요소 외에 달라진 것이 없는지 먼저 살펴보세요.",
      "같은 요청에도 매번 다른 답이 나올 수 있습니다. 두 요청을 각각 여러 번 실행하고, 잘 나온 응답뿐 아니라 조건을 어긴 응답과 응답을 받지 못한 오류도 기록하세요."
    ],
    "task": "같은 제품 정보로 안내문을 만들며 빈 틀의 효과를 비교하려고 합니다. 두 프롬프트 초안은 다음과 같습니다.\n\nA: “장점과 주의점 두 소제목을 넣고, 소제목마다 두 문장씩 해요체로 써 줘.”\n\nB: “장점과 주의점 두 소제목을 넣고, 소제목마다 한 문장씩 해요체로 써 줘.”\nB에 붙인 빈 틀:\n[장점]\n[문장]\n[주의점]\n[문장]\n\n1. 빈 틀 외에 달라진 조건을 찾고 B를 고치세요.\n2. 같은 모델과 설정으로 어떻게 반복할지, 무엇을 검사할지, 실행 오류는 어떻게 기록할지 적으세요.",
    "prompts": [
      "바꿀 요소 하나와 고정할 요소들을 적으세요.",
      "비교할 두 조건, 반복 계획, 검사 기준, 실패·누락 기록 방법을 간단히 작성하세요."
    ],
    "checks": [
      "B의 문장 수까지 달라진 것을 찾고 소제목마다 두 문장으로 고쳤나요?",
      "제품 정보·모델·설정·검사 기준을 같게 두고 빈 틀만 바꾸도록 했나요?",
      "반복할 방법과 실행 오류를 기록할 방법을 적었나요?"
    ],
    "example": "B도 소제목마다 두 문장을 요구하고 빈칸을 두 개씩 둡니다. 같은 제품 정보·모델·설정으로 실행하고, 소제목·문장 수·말투를 같은 기준으로 검사합니다. 반복 횟수와 순서를 미리 정하고 응답과 오류를 모두 남깁니다. 빈 틀과 문장 수를 함께 바꾼 원래 비교로는 빈 틀의 영향만 알 수 없습니다.",
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
    "title": "조건을 지킨 비율과 완벽한 응답의 비율 구분하기",
    "phase": "해석 · 범위",
    "question": "조건을 지킨 총횟수가 같아도 응답은 다를 수 있을까요?",
    "caseIndex": 5,
    "lesson": [
      "응답 두 개에서 네 조건씩 검사했다면 검사한 항목은 모두 여덟 개입니다. 이 중 여섯 개를 지켰다면 평균 규칙 준수율은 6 ÷ 8 = 75%입니다.",
      "네 조건을 모두 지킨 응답이 두 개 중 한 개라면, 완전 준수 응답 비율은 1 ÷ 2 = 50%입니다. 앞의 비율은 조건을 검사한 횟수를 기준으로, 이 비율은 응답 수를 기준으로 계산합니다.",
      "두 비율은 서로 다른 질문에 답합니다. 조건을 전반적으로 얼마나 지켰는지와, 고칠 곳이 없는 응답이 얼마나 나왔는지를 나누어 보세요. 어느 모델과 과제에서 얻은 결과인지도 함께 밝혀야 합니다."
    ],
    "task": "두 프롬프트 A와 B를 각각 다섯 번 실행하고, 응답마다 네 가지 조건을 검사했습니다.\n\nA: 응답 다섯 개를 받았습니다. 지킨 조건 수는 순서대로 4개, 3개, 3개, 2개, 4개입니다.\nB: 한 번은 오류가 났고 응답 네 개를 받았습니다. 지킨 조건 수는 순서대로 4개, 4개, 3개, 1개입니다.\n\n1. 받은 응답만 기준으로 A와 B의 평균 규칙 준수율을 계산하세요.\n2. 받은 응답 중 네 조건을 모두 지킨 응답의 비율도 계산하세요.\n3. 오류 한 번을 따로 기록하고, 두 프롬프트 중 어느 쪽이 더 낫다고 말할 수 있는지 설명하세요.\n\n계산 연습을 위해 만든 자료입니다.",
    "prompts": [
      "A와 B의 두 비율을 계산하고, 무엇을 분모로 썼는지 적으세요.",
      "오류 한 번을 따로 기록하고, 이 결과로 알 수 있는 것과 아직 모르는 것을 적으세요."
    ],
    "checks": [
      "평균 규칙 준수율을 계산한 식과 결과를 적었나요?",
      "모든 조건을 지킨 응답의 비율을 계산하고, 앞의 비율과 분모가 어떻게 다른지 적었나요?",
      "B의 시도 다섯 번·응답 네 개·오류 한 번을 구분하고, 결과를 지나치게 확대하지 않았나요?"
    ],
    "example": "A는 총 20번의 조건 검사 중 16번을 통과했으므로 평균 규칙 준수율이 80%입니다. 네 조건을 모두 지킨 응답은 다섯 개 중 두 개이므로 완전 준수 응답 비율은 40%입니다. B는 받은 응답 네 개만 계산하면 12 ÷ 16 = 75%, 2 ÷ 4 = 50%입니다. B의 실행 오류 한 번은 따로 기록합니다. 첫 번째 비율은 A가 높고 두 번째 비율은 B가 높습니다. 어떤 실패가 중요한지와 오류의 영향도 살펴봐야 하므로 이 자료만으로 어느 쪽이 항상 낫다고 단정할 수 없습니다.",
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
    "title": "표로 요청하고 받은 표 검사하기",
    "phase": "탐구 · 독립 설계",
    "question": "표에 빠진 항목과 불필요한 설명을 찾을 수 있나요?",
    "caseIndex": null,
    "lesson": [
      "이번에는 문단이 아니라 표를 요청합니다. 열은 세로 구분, 행은 가로 한 줄을 뜻합니다. “품목/수량”처럼 열의 이름을 적은 첫 줄은 머리글이며, 품목을 실제로 적은 줄과 구분합니다.",
      "원하는 열과 품목 수를 정하고 표 앞뒤에 설명을 붙여도 되는지도 알려 주세요. 빈 표를 더할지, 지시만 쓸지는 직접 고르세요.",
      "아래 연습에서는 미리 준비한 응답을 검사합니다. 여러분이 쓴 프롬프트를 실행한 결과는 아닙니다. 논문에서 배운 방법을 표에 적용해 보는 활동이며, 표에서도 같은 개선 효과가 있다는 뜻은 아닙니다."
    ],
    "task": "펜 2개, 공책 1개, 파일 3개를 표로 정리하려 합니다. 머리글은 “품목/수량” 두 칸으로 하고, 각 품목을 한 행씩 적고, 표 밖에는 설명을 쓰지 않아야 합니다.\n\n1. 지시만 쓸지, 예시나 빈 틀을 더할지 골라 프롬프트를 쓰세요.\n2. 아래 응답에서 세 조건을 각각 지켰는지 선택하세요.\n3. 조건을 어긴 부분을 찾아 고친 표를 답안에 쓰세요.\n\n아래 응답은 연습용으로 준비한 글이며, 여러분의 프롬프트를 실행한 결과가 아닙니다.",
    "prompts": [
      "AI에게 보낼 프롬프트와 그 방법을 고른 이유를 쓰세요.",
      "아래 표에서 어긴 조건을 설명하고, 고친 표를 쓰세요."
    ],
    "checks": [
      "품목/수량 두 열, 품목 세 개, 표 밖 설명 금지를 프롬프트에 적었나요?",
      "아래 응답에서 빠진 품목을 추가하고 표 밖 설명을 지웠나요?",
      "표의 머리글과 구분선을 품목 수에서 제외하고, 자기 프롬프트의 효과는 아직 미확인임을 밝혔나요?"
    ],
    "example": "표의 열은 품목과 수량 두 개로 맞습니다. 하지만 실제 품목은 두 개뿐이고 표 아래에 설명도 붙어 있습니다. “파일 | 3개” 행을 추가하고 표 밖 설명을 지워야 합니다. 자기 프롬프트에는 세 품목을 모두 넣고 표 밖에는 설명을 쓰지 말라고 요청할 수 있습니다. 준비된 표를 직접 고친 것과 자기 프롬프트를 실행해 효과를 확인한 것은 구분하세요.",
    "extra": "다음에는 같은 정보를 목록으로 출력하도록 바꾸어 보세요. 표 빈 틀을 그대로 붙이면 어떤 충돌이 생길까요?",
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
    "title": "며칠 뒤 다른 작업에 다시 적용하기",
    "phase": "유지 · 재적용",
    "question": "새로운 글에서도 조건을 어긴 부분을 찾을 수 있나요?",
    "caseIndex": null,
    "lesson": [
      "가능하면 앞 차시를 마친 뒤 며칠 지나서 풀어 보세요. 3~7일 정도 뒤에 이전 답안을 보지 않고 시작해 보는 것을 권합니다. 원하면 지금 이어서 진행해도 됩니다.",
      "먼저 준비된 새 응답을 검사하고 필요한 부분을 고칩니다. 그다음 자신이 AI에게 부탁하고 싶은 작업을 하나 골라 조건과 프롬프트를 작성합니다.",
      "여기서는 글의 형식을 정하고 지시를 지켰는지 확인하는 능력을 연습합니다. 글이 사실인지, 창의적인지, 업무에 도움이 되는지까지 이 활동으로 평가하지는 않습니다."
    ],
    "task": "번호 목록 세 항목으로 된 안내문을 요청했습니다. 각 항목은 한 문장이어야 하고, 모두 합니다체로 끝나야 합니다.\n\n1. 아래 응답이 세 조건을 지켰는지 각각 선택하세요.\n2. 고쳐야 할 부분만 수정해 답안에 쓰세요.\n3. 자신이 AI에게 부탁하고 싶은 작업을 하나 정하세요. 형식 조건 세 가지를 정하고, 요청 방법을 고른 이유와 프롬프트를 쓰세요.\n4. 자기 프롬프트를 실행하지 않았다면 “내 작업은 실행 전”이라고 적으세요.",
    "prompts": [
      "아래 응답에서 어긴 조건과 고친 글을 쓰세요.",
      "내 작업의 조건 세 가지, 프롬프트, 방법을 고른 이유, 실행 여부를 적으세요."
    ],
    "checks": [
      "목록의 항목 수·항목별 문장 수·말투를 각각 검사하고 필요한 부분만 고쳤나요?",
      "내 작업의 형식 조건 세 가지와 프롬프트를 쓰고, 요청 방법을 고른 이유를 설명했나요?",
      "아래 연습 응답을 검사한 결과와 내 프롬프트를 실행했는지 여부를 구분했나요?"
    ],
    "example": "연습 응답은 세 항목이지만 둘째 항목이 두 문장이고 첫째 항목은 해요체입니다. 첫째 항목은 “신청서를 제출합니다.”로, 둘째 항목은 “자료를 확인한 뒤 파일을 저장합니다.”로 고칠 수 있습니다. 셋째 항목은 유지합니다. 내 작업은 별도로 정하고, 실행하지 않았다면 응답을 검사한 것처럼 기록하지 않습니다.",
    "extra": "선택한 내 작업을 실제로 실행했다면 받은 응답 그대로을 보관하고 조건별로 검사해 보세요. 무료로 쓰는 AI나 ‘나의 실험’을 이용할 수 있습니다. API 실행은 필수가 아닙니다.",
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
