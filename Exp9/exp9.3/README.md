# Experiment 3.2.3 - AWS Deployment

## Aim
To deploy a full-stack application on AWS using load balancing and auto-scaling.

## Objectives
- Configure AWS infrastructure (EC2, ALB)
- Implement auto-scaling
- Deploy Docker containers
- Setup CI/CD pipeline

## Tools Used
- AWS EC2
- Docker
- Terraform
- GitHub Actions

## Workflow
1. terraform apply to create infrastructure
2. Push code to GitHub
3. CI/CD builds Docker image
4. Deploy on EC2 / ECS
5. Load balancer distributes traffic

## Output
- Highly available system
- Load-balanced traffic
- Auto scaling enabled
- Zero downtime deployment
