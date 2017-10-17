FROM tomcat
MAINTAINER christian at kartoza dot com

RUN rm -r /usr/local/tomcat/webapps/ROOT

COPY resources/ROOT.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]