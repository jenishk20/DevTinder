const About = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-center max-w-2xl">
        DevTinder is a platform designed to connect developers and tech
        enthusiasts. Whether you're looking for collaboration, mentorship, or
        simply want to share your projects, DevTinder provides a space for you
        to grow and connect with like-minded individuals.
      </p>
      <p className="text-lg text-center mt-4">
        Join us in building a vibrant community of developers!
      </p>
      <p className="text-lg text-center mt-4 font-semibold">GitHub Link:</p>
      <a
        href="https://github.com/jenishk20"
        className="text-blue-500 hover:text-blue-700 underline mt-2"
      >
        Visit our GitHub
      </a>
    </div>
  );
};

export default About;
