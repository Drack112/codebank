FROM golang:1.18 as development

WORKDIR /go/src

COPY go.mod /go/src/

ENV PATH="/go/bin:${PATH}"
ENV GO111MODULE=on
ENV CGO_ENABLED=1

RUN apt-get update && \
    apt-get install build-essential protobuf-compiler librdkafka-dev -y && \
    go get google.golang.org/grpc/cmd/protoc-gen-go-grpc && \
    go get google.golang.org/protobuf/cmd/protoc-gen-go && \
    go get github.com/spf13/cobra-cli && \
    go get github.com/spf13/cobra && \
    wget https://github.com/ktr0731/evans/releases/download/0.9.1/evans_linux_amd64.tar.gz && \
    tar -xzvf evans_linux_amd64.tar.gz && \
    mv evans ../bin && rm -f evans_linux_amd64.tar.gz

CMD ["go", "run", "main.go"]

FROM golang:1.18 as production

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}"

RUN apt-get update && \
    apt-get install build-essential librdkafka-dev -y && \
    apt install -y libc6 libc-bin

COPY . .
RUN GOOS=linux go build -ldflags="-s -w" -o codebank
ENTRYPOINT ["./codebank"]
