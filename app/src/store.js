import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    scoreBoard: {
      rookie: 2,
      teams: 1,
      classin: 0,
      sharepoint: 0,
      chalk: 2,
      yammer: 0,
      yuque: 2
    },
    questions: [
      {
        title: '又到了交作业的时间，此时你的作业才做了个大概，这时候你会？',
        options: [
          {
            title: '先提交再说，别错过提交时间',
            rookie: 0,
            teams: 2,
            classin: 0,
            sharepoint: 0,
            chalk: 2,
            yammer: 0,
            yuque: 0
          },
          {
            title: '大概过一遍，没大错就交',
            rookie: 1,
            teams: 1,
            classin: 0,
            sharepoint: 1,
            chalk: 1,
            yammer: 0,
            yuque: 0
          },
          {
            title: '不论如何还是要反复检查，直至完美',
            rookie: 2,
            teams: 0,
            classin: 0,
            sharepoint: 2,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '上课时，老师说：这个作业随意结组，自己做也行，你会选择？',
        options: [
          {
            title: '主动寻找伙伴',
            rookie: 0,
            teams: 2,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 2,
            yuque: 2
          },
          {
            title: '有人来找就一组，没有就自己做',
            rookie: 0,
            teams: 0,
            classin: 1,
            sharepoint: 1,
            chalk: 0,
            yammer: 1,
            yuque: 1
          },
          {
            title: '坚决独立完成',
            rookie: 0,
            teams: 0,
            classin: 2,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '入学教育期间，面对陌生的新同学们，你会',
        options: [
          {
            title: '主动上前搭讪',
            rookie: 0,
            teams: 2,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 2,
            yuque: 1
          },
          {
            title: '等别人来搭话',
            rookie: 0,
            teams: 0,
            classin: 1,
            sharepoint: 2,
            chalk: 0,
            yammer: 1,
            yuque: 1
          },
          {
            title: '还是喜欢独来独往',
            rookie: 0,
            teams: 0,
            classin: 2,
            sharepoint: 1,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '在议事会上，你对学校的新规定很有意见，这时你会',
        options: [
          {
            title: '当众发言提出自己的观点',
            rookie: 2,
            teams: 1,
            classin: 0,
            sharepoint: 0,
            chalk: 2,
            yammer: 2,
            yuque: 1
          },
          {
            title: '私下和负责人提议',
            rookie: 1,
            teams: 0,
            classin: 1,
            sharepoint: 2,
            chalk: 1,
            yammer: 1,
            yuque: 1
          },
          {
            title: '选择沉默，围观吃瓜',
            rookie: 0,
            teams: 0,
            classin: 1,
            sharepoint: 1,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '又到了一年一度的银杏节，面对一地金黄的美景，你通常会？',
        options: [
          {
            title: '提前计划、积极参与、提前和好友们约拍照时间',
            rookie: 2,
            teams: 2,
            classin: 0,
            sharepoint: 0,
            chalk: 2,
            yammer: 2,
            yuque: 0
          },
          {
            title: '路过就凑个热闹',
            rookie: 0,
            teams: 1,
            classin: 1,
            sharepoint: 0,
            chalk: 1,
            yammer: 1,
            yuque: 1
          },
          {
            title: '平淡摸鱼度过',
            rookie: 0,
            teams: 0,
            classin: 1,
            sharepoint: 1,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '对于朋友圈里转发的社会新闻和时事热点，你通常会？',
        options: [
          {
            title: '十分热衷',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 2
          },
          {
            title: '偶尔点开',
            rookie: 0,
            teams: 0,
            classin: 1,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 1
          },
          {
            title: '漠不关心',
            rookie: 0,
            teams: 0,
            classin: 1,
            sharepoint: 1,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '今天上课又听天书了，你会？',
        options: [
          {
            title: '向老师或同学求助',
            rookie: 1,
            teams: 1,
            classin: 0,
            sharepoint: 1,
            chalk: 2,
            yammer: 2,
            yuque: 2
          },
          {
            title: '课下自己苦苦钻研',
            rookie: 0,
            teams: 0,
            classin: 2,
            sharepoint: 2,
            chalk: 1,
            yammer: 1,
            yuque: 2
          },
          {
            title: '佛系随缘',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '又到了学段末，各种project、大作业、考试疯狂袭来，你会？',
        options: [
          {
            title: '列to do list，一项一项完成',
            rookie: 2,
            teams: 1,
            classin: 0,
            sharepoint: 0,
            chalk: 2,
            yammer: 0,
            yuque: 1
          },
          {
            title: '想起哪个做哪个or喜欢哪个先做哪个',
            rookie: 1,
            teams: 1,
            classin: 0,
            sharepoint: 1,
            chalk: 1,
            yammer: 0,
            yuque: 0
          },
          {
            title: '都拖到ddl疯狂完成，ddl是第一生产力',
            rookie: 0,
            teams: 2,
            classin: 0,
            sharepoint: 2,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '希悦又滴滴你成绩通知，一看发现是倒数几名，你是？',
        options: [
          {
            title: '保持乐观，重振旗鼓',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 2,
            yuque: 0
          },
          {
            title: '保持乐观，重振旗鼓',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 1,
            yuque: 0
          },
          {
            title: '痛不欲生，一蹶不振',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '一年一度激动人心的选课抽签中，你通常是怎样的状态？',
        options: [
          {
            title: '满含信心，十分擅长分配选课币',
            rookie: 1,
            teams: 1,
            classin: 0,
            sharepoint: 0,
            chalk: 2,
            yammer: 0,
            yuque: 0
          },
          {
            title: '紧张头疼，反复调来调去',
            rookie: 2,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 1,
            yammer: 0,
            yuque: 0
          },
          {
            title: '烧一注香，坐等调剂',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 1,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '蓦然回首，上高中以后，你身边最好的朋友们主要是？',
        options: [
          {
            title: '刚认识就一拍即合的',
            rookie: 0,
            teams: 2,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 2,
            yuque: 0
          },
          {
            title: '相处一段后才慢慢熟悉的',
            rookie: 0,
            teams: 0,
            classin: 2,
            sharepoint: 2,
            chalk: 0,
            yammer: 0,
            yuque: 0
          },
          {
            title: '还是很久之前的朋友（初中，小学）',
            rookie: 0,
            teams: 0,
            classin: 2,
            sharepoint: 1,
            chalk: 0,
            yammer: 1,
            yuque: 0
          }
        ]
      },
      {
        title: '遇到合作任务时，对于组内分工，你通常会选择什么角色？',
        options: [
          {
            title: '主动担任组长等领导性角色',
            rookie: 1,
            teams: 2,
            classin: 2,
            sharepoint: 1,
            chalk: 2,
            yammer: 0,
            yuque: 2
          },
          {
            title: '先静观，没人上我就上',
            rookie: 1,
            teams: 1,
            classin: 0,
            sharepoint: 2,
            chalk: 1,
            yammer: 0,
            yuque: 1
          },
          {
            title: '当个小透明，听从安排',
            rookie: 0,
            teams: 0,
            classin: 1,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '又是抓狂的一天，上高中后杂事太多，心里好乱，你会？',
        options: [
          {
            title: '默默发呆，闷头睡觉',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 0
          },
          {
            title: '和朋友聊天吐槽',
            rookie: 1,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 2,
            yuque: 0
          },
          {
            title: '通过听歌，画画、唱歌、运动等爱好调节',
            rookie: 1,
            teams: 0,
            classin: 2,
            sharepoint: 0,
            chalk: 0,
            yammer: 1,
            yuque: 0
          }
        ]
      },
      {
        title: '考试的最后一道大题又头秃不会，卷子发下来后， 你会？',
        options: [
          {
            title: '刨根问底，不搞明白不罢休',
            rookie: 2,
            teams: 1,
            classin: 0,
            sharepoint: 0,
            chalk: 2,
            yammer: 0,
            yuque: 2
          },
          {
            title: '努力一下，但太费劲就放弃',
            rookie: 1,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 1,
            yammer: 0,
            yuque: 1
          },
          {
            title: '搞它干嘛，不如干点别的',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 0
          }
        ]
      },
      {
        title: '老师给你布置的阅读书目是你完全不了解的新领域，此时你会？',
        options: [
          {
            title: '十分乐于探索新鲜事物',
            rookie: 1,
            teams: 1,
            classin: 2,
            sharepoint: 0,
            chalk: 2,
            yammer: 0,
            yuque: 2
          },
          {
            title: '试着看看，太难就算了',
            rookie: 1,
            teams: 0,
            classin: 1,
            sharepoint: 0,
            chalk: 1,
            yammer: 0,
            yuque: 1
          },
          {
            title: '不感兴趣， 拖到ddl最后几天才看',
            rookie: 0,
            teams: 0,
            classin: 0,
            sharepoint: 0,
            chalk: 0,
            yammer: 0,
            yuque: 1
          }
        ]
      }
    ]
  }
})

export default store
