# Use nginx base image
FROM nginx:alpine

# Copy static assets and templates to nginx directory
COPY templates/index.html /usr/share/nginx/html
COPY static /usr/share/nginx/html/static

# Expose port 80 to allow outside access to your application
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
