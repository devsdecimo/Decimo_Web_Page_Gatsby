const setupJobs = (jobs) => {
  const allJobs = {};
  
  //Count the number of jobs
  jobs.forEach((job) => {
    const oneJob = job.relationships.field_job_department;
    if (allJobs[oneJob.name]) {
      allJobs[oneJob.name] = allJobs[job.name] + 1;
    } else {
      allJobs[oneJob.name] = 1;
    }
  });

  //Sort alphabetically
  const newJobs = Object.entries(allJobs).sort((a, b) => {
    const [firsJob] = a;
    const [secondJob] = b;
    return firsJob.localeCompare(secondJob);
  });

  return newJobs;
};

export default setupJobs;
