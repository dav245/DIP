<script setup lang="ts">
import { useQuery } from "@/utils/query";
import { getReceivedMessages } from "@common/ts/api/receivedMessages";
import { ref } from "vue";

const { data, loading } = useQuery({ query: () => getReceivedMessages() });
</script>

<template>
  <div>{{ data?.data }}</div>
</template>
