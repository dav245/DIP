import CForm from "@/components/CForm";
import CCard from "@/components/CCard";
import CInput from "@/components/CInput";
import CRecipientSelect from "@/components/CRecipientSelect";
import CButton from "@/components/CButton";
import { createMessage } from "@common/ts/api/createMessage";
import { showMessage } from "@/utils/messages";
import { getMessage } from "@common/ts/api/getMessage";
import { useStore } from "@/utils/store";
import { Component, createSignal, onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import CAppLayout from "@c/CAppLayout";

const NewMessage: Component = () => {
  const params = useParams();
  const store = useStore();

  const [loading, setLoading] = createSignal(!!params.from);
  let contentRef: HTMLInputElement & HTMLTextAreaElement | undefined = undefined;

  onMount(async () => {
    if (!params.from) return;
    const response = await getMessage(params.from);

    if (response) {
      setSubject(response.message.message_content?.subject ?? "");
      setContent(
        `\n\n------- Původní zpráva -------\n` +
        response.message.message_content?.content ?? ""
      );
      setRecipients((response.message.message_content?.recipients ?? [])
        .concat(
          response.message.message_content?.user
            ? [response.message.message_content.user]
            : []
        )
        .map((user) => user.id)
        .filter((userId) => userId !== store.userId())
      );
    }
    setLoading(false);

    contentRef?.focus();
    contentRef?.setSelectionRange(0, 0);
  });

  const [recipients, setRecipients] = createSignal<number[]>([]);
  const [subject, setSubject] = createSignal('');
  const [content, setContent] = createSignal('');

  const submit = async (reset: () => void) => {
    const response = await createMessage({
      send: true,
      content: content(),
      subject: subject(),
      recipients: recipients()
    });

    if (response) {
      showMessage({
        title: "Zpráva odeslána",
        type: "success",
        content: "Zpráva byla úspěšně odeslána",
      });

      setSubject("");
      setContent("");
      setRecipients([]);

      reset();
    }
  };

  return (
    <CAppLayout>
      <CCard title="Naspat novou zprávu">
        <CForm submit={submit} class="new-message-form">
          <CRecipientSelect
            value={recipients()}
            updateValue={setRecipients}
            required
            disabled={loading()}
            label="Komu"
            name="recipients"
          />
          <CInput
            value={subject()}
            updateValue={setSubject}
            required
            disabled={loading()}
            label="Předmět"
            name="subject"
          />
          <CInput
            ref={contentRef}
            value={content()}
            updateValue={setContent}
            required
            disabled={loading()}
            label="Obsah"
            name="content"
            type="textarea"
          />

          <CButton color="success" class="new-message-form-submit">
            Odeslat
          </CButton>
        </CForm>
      </CCard>
    </CAppLayout>
  )
}

export default NewMessage;