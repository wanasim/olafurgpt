import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "../button";
import ChatActions from "./chat-actions";
import ChatMessage from "./chat-message";
import { ChatHandler } from "./chat.interface";
import { useClientConfig } from "./hooks/use-config";

export default function ChatMessages(
  props: Pick<
    ChatHandler,
    "messages" | "isLoading" | "reload" | "stop" | "append"
  >,
) {
  const { starterQuestions } = useClientConfig();
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const messageLength = props.messages.length;
  const lastMessage = props.messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== "user";
  const showReload =
    props.reload && !props.isLoading && isLastMessageFromAssistant;
  const showStop = props.stop && props.isLoading;

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = props.isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage]);

  return (
    <div
      className="flex-1 w-full rounded-xl bg-[#1B384D] bg-opacity-85 p-4 shadow-xl relative overflow-y-auto"
      ref={scrollableChatContainerRef}
    >
      <div className="flex flex-col gap-5 divide-y">
        {!props.messages.length && (
          <div className="text-xl text-center">
            <h1 className="font-bold mb-6">Welcome to ÓlafurGPT!</h1> Dive into
            the mesmerizing universe of the Icelandic composer and
            multi-instrumentalist Ólafur Arnalds. Whether you&rsquo;re curious
            about his discography, upcoming performances, or the stories behind
            his evocative compositions, ÓlafurGPT is here to provide you with
            detailed, accurate information drawn from publicly available data.
            Ask your questions clearly and concisely, and let ÓlafurGPT guide
            you through the serene and captivating realm of Ólafur&rsquo;s music
            and artistry.
          </div>
        )}
        {props.messages.map((m, i) => {
          const isLoadingMessage = i === messageLength - 1 && props.isLoading;
          return (
            <ChatMessage
              key={m.id}
              chatMessage={m}
              isLoading={isLoadingMessage}
            />
          );
        })}
        {isPending && (
          <div className="flex justify-center items-center pt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      {(showReload || showStop) && (
        <div className="flex justify-end py-4">
          <ChatActions
            reload={props.reload}
            stop={props.stop}
            showReload={showReload}
            showStop={showStop}
          />
        </div>
      )}
      {!messageLength && starterQuestions?.length && props.append && (
        <div className="mt-8 text-blue-950  left-0 w-full">
          <div className="flex flex-wrap flex-row py-4 gap-4 justify-center mx-16">
            {starterQuestions.map((question, i) => (
              <Button
                className="hover:bg-sky-300 border-none"
                variant="outline"
                key={i}
                onClick={() =>
                  props.append!({ role: "user", content: question })
                }
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
