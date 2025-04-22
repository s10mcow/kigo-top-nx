# Frontend Web Application Deployment Documentation

This documentation outlines the steps required to deploy any frontend web application. Specifically, it covers the process for **test** and **staging** environments, which involves collaboration between **Kigo** and **RapidScale**.

---

## Overview of the Process

1. **Create a Support Ticket:** Submit a ticket to RapidScale to build the infrastructure for the Elastic Container Registry (ECR).
2. **Set Up CodePipeline:** Once the ECR is ready, configure the CodePipeline to deploy the application and push the Docker image to the ECR.
3. **Complete the Setup:** Follow up with RapidScale on the ticket to set up the Elastic Container Service (ECS) task definitions and complete the deployment process.

---

## RapidScale Ticket Creation Template

- **RapidScale Help Center URL:** [RapidScale Help Center](https://lw-jira.atlassian.net/servicedesk/customer/portals)

  - If you don’t have access, contact **DevOps** or **Justin Buhl** to request access. Moving forward, this process will be handled by the **DevOps team**.

- **How to Create a Ticket:** [Guide for Submitting a Request](https://scribehow.com/shared/Submitting_a_Request_for_New_Frontend_Services__DOFAJLupScmD3oBwCGsg4A)

- **Ticket Example:** Refer to this [example ticket for TOP](https://lw-jira.atlassian.net/servicedesk/customer/portal/2/ITSD-556386?created=true) for guidance.

- **Note on Port Usage:** Include the **PORT** in the ticket description. The standard port for Next.js applications is **8080**.

---

## After RapidScale Creates the ECR and ECS

### Confirm the ECR

1. Log in to `augeo-ct-heaps-shared` AWS environment.
2. Use the **PowerUser** role.
3. Navigate to **Elastic Container Registry (ECR)**.
4. Confirm the new private repository is present.

### Confirm the ECS

1. Navigate to the **augeo-ct-heaps-[env]** AWS environment (not in `augeo-ct-heaps-shared`).
2. Go to **Elastic Container Service (ECS)**.
3. Click on `kigo-test-cluster-1`.
4. Verify the new ECS service exists.

---

## Create the `Dockerfile` in the Repository

1. Add a `Dockerfile` in the repository for the application you want to deploy.
   - Reference the [kigo-local-plus Dockerfile](https://github.com/Kigo-Digital/kigo-local-plus/blob/main/Dockerfile) as an example.
2. Test the `Dockerfile` locally:
   ```bash
   docker build -t [nextjs-app-test] .
   ```
3. Verify the application works in Docker (Optional):
   ```bash
   docker run -p 3000:3000 -e PORT=3000 -e HOSTNAME=0.0.0.0 nextjs-app-test
   ```

## Create the BuildSpec File

### Notes:

- The `buildspec` file should be placed in the `deployment` directory (e.g., `./deployment/buildspec.test.yml`).
- You may use separate `buildspec` files for each environment (test, staging, production) or a single file with conditional logic to handle environment-specific configurations.

### Example BuildSpec:

Refer to the [kigo-local-plus buildspec files](https://github.com/Kigo-Digital/kigo-local-plus/tree/main/deployment) for a detailed example.

### Key Variables:

1. **REPOSITORY_URI:**  
   This is the URI of the Elastic Container Registry (ECR) created by RapidScale. It remains the same for test, staging, and production environments.
2. **CONTAINER_NAME:**  
   This is the name of the container defined in the ECS service by RapidScale. It varies depending on the environment (test, staging, production).

---

## Create the Pipeline

Follow this [guide for creating an AWS CodePipeline](https://scribehow.com/shared/Create_AWS_CodePipeline_for_Kigo_Top_Test__vL7baPxFTLSC7s5QW93YrA).

### Add IAM Permissions:

Ensure the CodeBuild service role has the necessary permissions to avoid pipeline failures.

#### Example Issue:

```text
AccessDeniedException: User: arn:aws:sts::969243726486:assumed-role/codebuild-kigo-top-test-build-service-role/AWSCodeBuild-a1e1ed3f-8946-4628-90ed-79cb3c439447 is not authorized to perform: ssm:GetParameters on resource: arn:aws:ssm:us-east-1:969243726486:parameter/kigo/test/secrets/test-dockerPassword
```

## Resolution

1. **Attach the AmazonSSMReadOnlyAccess Policy:**
   - Attach the `AmazonSSMReadOnlyAccess` policy to the CodeBuild service role to resolve access issues.
2. **Troubleshooting Guide:**
   - Refer to this [Scribe guide for troubleshooting CodePipeline](https://scribehow.com/shared/Troubleshoot_CodePipeline_Failed_Stage_and_Retry__3qeqP5rrQbuwnPitf6I_lw).

---

## Verify ECR and ECS After Build Pipeline

1. **Log in to AWS Environment:**
   - Log in to the `augeo-ct-heaps-shared` AWS environment.
2. **Navigate to ECR:**
   - Verify the following:
     - The ECR repository exists.
     - New images have been pushed successfully.
   - Refer to this [guide for accessing ECR](https://scribehow.com/shared/Accessing_Elastic_Container_Registry_in_AWS__NV023d6wQv2ztaemuLunYg).

---

## Follow-Up with RapidScale

1. After the build pipeline passes, follow up with RapidScale by commenting on the existing ticket.
2. **RapidScale Follow-Up Tasks:**
   - Configure the health check.
   - Set up the task definitions.
3. Refer to this [Scribe guide for adding comments in Jira Service Desk](https://scribehow.com/shared/How_To_Add_A_Comment_In_Jira_Service_Desk__q2w6S7yoTQuch4T2wj3deQ).

---

## Summary

This process ensures seamless deployment for frontend web applications by leveraging AWS infrastructure and RapidScale services.

### Key Takeaways:

1. Document every step carefully.
2. Test all configurations locally before deployment.
3. Address pipeline and IAM permission issues proactively.
4. Follow up with RapidScale to complete the deployment process.

//
