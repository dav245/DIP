<script lang="ts">
  import CForm from "@/components/CForm.svelte";
  import CCard from "@/components/CCard.svelte";
  import CInput from "@/components/CInput.svelte";
  import CRecipientSelect from "@/components/CRecipientSelect.svelte";
  import CButton from "@/components/CButton.svelte";
  import {
    createMessage,
    type CreateMessagePayload,
  } from "@common/ts/api/createMessage";
  import { showMessage } from "@/utils/messages";
  import { getMessage } from "@common/ts/api/getMessage";
  import { useStore } from "@/utils/store";
  import { onMount } from "svelte";
  import type { RouteProps } from "svelte-router-spa/types/components/route";
  import { ignoreUnusedRouteInfo } from "@/utils/router";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);

  const { userId } = useStore();

  let loading = !!currentRoute.namedParams.from;
  let contentRef: CInput;

  onMount(async () => {
    if (!currentRoute.namedParams.from) return;
    const response = await getMessage(currentRoute.namedParams.from);

    if (response) {
      form.subject = response.message.message_content?.subject ?? "";
      form.content =
        `\n\n------- Původní zpráva -------\n` +
          response.message.message_content?.content ?? "";
      form.recipients = (response.message.message_content?.recipients ?? [])
        .concat(
          response.message.message_content?.user
            ? [response.message.message_content.user]
            : []
        )
        .map((user) => user.id)
        .filter((userId) => userId !== $userId);
    }
    loading = false;

    contentRef?.cursorToStart();
  });

  const form: CreateMessagePayload = {
    recipients: [],
    subject: "",
    content: "",
    send: true,
  };

  const submit = async (reset: () => void) => {
    const response = await createMessage(form);

    showMessage({
      title: "Zpráva odeslána",
      type: "success",
      content: "Zpráva byla úspěšně odeslána",
    });

    form.subject = "";
    form.content = "";
    form.recipients = [];

    reset();
  };
</script>

<CCard title="Naspat novou zprávu">
  <CForm {submit} class="new-message-form">
    <CRecipientSelect
      bind:value={form.recipients}
      required
      disabled={loading}
      label="Komu"
      name="recipients"
    />
    <CInput
      bind:value={form.subject}
      required
      disabled={loading}
      label="Předmět"
      name="subject"
    />
    <CInput
      bind:this={contentRef}
      bind:value={form.content}
      required
      disabled={loading}
      label="Obsah"
      name="content"
      type="textarea"
    />

    <CButton color="success" class="new-message-form-submit">Odeslat</CButton>
  </CForm>
</CCard>
