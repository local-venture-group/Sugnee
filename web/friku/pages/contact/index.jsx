import { useForm } from "react-hook-form";

const contact = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center my-20">お問い合わせ</h1>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="mt-12 pl-8"
      >
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            お名前
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="name"
            type="name"
            placeholder="お名前"
            {...register("name", { required: true })}
            required
          />
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register("email", { required: true })}
            required
          />
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="content"
          >
            お問い合わせ内容
          </label>
          <textarea
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="content"
            type="content"
            placeholder="お問い合わせ内容"
            {...register("content", { required: true })}
            required
          />
        </div>
        <div className="w-full px-3 my-12 smd:mb-0">
          <button
            className="btn btn-primary border-0 hover:shadow px-8 rounded-lg w-full"
            type="submit"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default contact;
