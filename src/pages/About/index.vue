<template>
  <ContentLayout>
    <template #title>
      {{ i18nJson.about.title }}
    </template>
    <Content class="section">
      <div class="section_title">
        {{ i18nJson.about.profile }}
      </div>
      <Text>{{ i18nJson.about.profile_items[0] }}</Text>
      <Text>{{ i18nJson.about.profile_items[1] }}</Text>
      <ListItem v-for="text of i18nJson.about.items">{{ text }}</ListItem>
      <Text>{{ i18nJson.about.profile_items[2] }}</Text>
    </Content>
    <Content class="section members">
      <div class="section_title">
        {{ i18nJson.about.members }}
      </div>
      <Text>{{ i18nJson.about.membersDescription }}</Text>
      <div class="flex-row-wrap justify-center py-[20px] gap-20">
        <div class="member" v-for="member of members">
          <img :src="member.imgUrl" :alt="member.job">
          <div class="text-center">{{ member.name }}</div>
          <div class="text-center">{{ member.job }}</div>
        </div>
      </div>
    </Content>
  </ContentLayout>
</template>
<script lang="ts" setup>
import { computed, unref } from 'vue';
import ContentLayout from '../../components/ContentLayout.vue'
import Content from '../../components/Content.vue'
import Text from '../../components/Text.vue';
import ListItem from '../../components/ListItem.vue';
import { LANG } from '../../scripts/constant';
import useI18nJSONAsync from '../../scripts/useI18nJSONAsync';
import member0 from './images/img_member_CTO.jpg'
import member1 from './images/img_member_CEO.jpg'
import member2 from './images/img_member_Senior-Software-Engineer-0.jpg'
import member3 from './images/img_member_Senior-Hareware-Engineer.jpg'
import member4 from './images/img_member_Full-Stack-Supervisor.jpg'
import member5 from './images/img_member_Senior-Software-Engineer-1.jpg'

const i18nMap = {
  [LANG.EN_US]: () => import('./i18n/en-us'),
  [LANG.ZH_CN]: () => import('./i18n/zh-cn'),
  [LANG.ZH_HK]: () => import('./i18n/zh-hk'),
}

const i18nJson = useI18nJSONAsync(i18nMap)

const members = computed(() => [
  { name: 'Lintel', job: unref(i18nJson).about.CEO, imgUrl: member0 },
  { name: 'Ray', job: unref(i18nJson).about.CTO, imgUrl: member1 },
  { name: 'Shawn Luo', job: unref(i18nJson).about.Software, imgUrl: member2 },
  { name: 'Jason Wong', job: unref(i18nJson).about.Hareware, imgUrl: member3 },
  { name: 'Arylo Yeung', job: unref(i18nJson).about.FullStack, imgUrl: member4 },
  { name: 'Vic', job: unref(i18nJson).about.Software, imgUrl: member5 },
])

</script>
<style lang="scss" scoped>
@use '../../styles/content.scss';

.section {
  --uno: 'py-[26px]';
}
.members {
  --bg-url: url(../../images/img_team_bg.jpg);
  @screen lt-sm {
    --bg-url: url(../../images/img_team_bg@640.png);
  }
  @screen at-sm {
    --bg-url: url(../../images/img_team_bg@768.png);
  }
  @screen at-md {
    --bg-url: url(../../images/img_team_bg@1024.png);
  }
  @screen at-lg {
    --bg-url: url(../../images/img_team_bg@1280.png);
  }
  @screen at-xl {
    --bg-url: url(../../images/img_team_bg@1536.png);
  }
  --uno: 'bg-gray';
  background-image: var(--bg-url);
  background-position: center center;
  background-size: auto 100%;
}
.members {
  --uno: 'color-white bg-gray';
  .text {
    --uno: 'text-[16px] text-center pb-[35px]';
  }
  .member {
    --uno: 'flex-col-nowrap gap-[5px]';
    img {
      --uno: 'block w-[200px] h-[133px] bg-white';
    }
    div {
      --uno: 'text-[14px] text-center';
    }
  }
}
</style>
