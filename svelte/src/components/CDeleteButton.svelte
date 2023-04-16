<script lang="ts">
  import { withLoading } from "@/utils/loadingState";
  import { deleteMessage } from "@common/ts/api/deleteMessage";
  import CButton from "./CButton.svelte";

  export let messageId: string | number;
  export let onDeleted: (messageId: string | number) => void;

  const { loading, run: deleteMessageOnClick } = withLoading(
    deleteMessage,
    () => onDeleted(messageId)
  );
</script>

<CButton
  let:shouldConfirm
  size="medium"
  color="error"
  disabled={$loading}
  loading={$loading}
  confirm
  onClick={() => deleteMessageOnClick(messageId)}
>
  {shouldConfirm ? "Opravdu?" : "Smazat"}
</CButton>
