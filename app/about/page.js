import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Blog Website</title>
        <meta
          name="description"
          content="Learn more about our blog website and our mission."
        />
      </Head>
      <div className="max-w-3xl mx-auto p-6 space-y-6 h-screen">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg text-gray-700">
          Welcome to our blog website, where we share insights, knowledge, and
          stories across various topics. Our mission is to provide high-quality
          content that informs, inspires, and engages our readers.
        </p>
        <h2 className="text-2xl font-semibold">Our Vision</h2>
        <p className="text-lg text-gray-700">
          We believe in the power of words to educate and connect people. Our
          goal is to create a platform that encourages thoughtful discussions
          and knowledge sharing.
        </p>
        <h2 className="text-2xl font-semibold">Meet the Team</h2>
        <p className="text-lg text-gray-700">
          Our team consists of passionate writers, developers, and designers who
          work together to deliver an exceptional reading experience.
        </p>
      </div>
    </>
  );
}
