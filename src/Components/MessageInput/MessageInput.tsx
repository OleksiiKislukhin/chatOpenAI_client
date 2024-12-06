type Props = {
  onSubmit: (message: string) => void;
};

export const MessageInput = ({ onSubmit }: Props) => {
  const formAction = (formData: FormData) => {
    const message = formData.get('message');
    onSubmit(message as string);
  };

  return (
    <form
      action={formAction}
      className="flex m-top-4 w-full rounded-xl"
    >
      <input
        type="text"
        name="message"
        autoComplete="off"
        className="flex h-10 w-full rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white pl-4 focus:border-indigo-300 focus:outline-none dark:focus:border-indigo-500"
      />
    </form>
  );
};
