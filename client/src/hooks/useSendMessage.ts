import { SEND_MESSAGE } from "../queries/mutation";
import { useMutation } from "@apollo/client";
import { MessageType } from "../types/graphQLTypes";

const useSendMessage = () => {
  const [sendMessage] = useMutation<MessageType>(SEND_MESSAGE, {
    onError: (error) => {
      console.log(error);
    },
  });
  return { sendMessage };
};
export default useSendMessage;
