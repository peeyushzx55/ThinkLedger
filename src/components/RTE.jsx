import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="border border-white/20 rounded-lg overflow-hidden">
            <Editor
              apiKey="d30sii8kkpyeysthyasmzhwhhji1mvmt1i7z1u7z31v2ejey"
              value={value || defaultValue}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: `
                  body { 
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    font-size: 16px; 
                    line-height: 1.6; 
                    color: #e5e7eb; 
                    background-color: #1f2937; 
                    padding: 20px;
                  }
                  h1, h2, h3, h4, h5, h6 { 
                    color: #f9fafb; 
                    margin-top: 1.5em; 
                    margin-bottom: 0.5em; 
                  }
                  p { 
                    margin-bottom: 1em; 
                    color: #e5e7eb; 
                  }
                  a { 
                    color: #a855f7; 
                    text-decoration: underline; 
                  }
                  ul, ol { 
                    color: #e5e7eb; 
                    margin-bottom: 1em; 
                  }
                  li { 
                    color: #e5e7eb; 
                    margin-bottom: 0.5em; 
                  }
                  blockquote { 
                    border-left: 4px solid #a855f7; 
                    padding-left: 1em; 
                    margin: 1em 0; 
                    color: #d1d5db; 
                  }
                  code { 
                    background-color: #374151; 
                    color: #fbbf24; 
                    padding: 0.2em 0.4em; 
                    border-radius: 0.25em; 
                  }
                  pre { 
                    background-color: #374151; 
                    color: #e5e7eb; 
                    padding: 1em; 
                    border-radius: 0.5em; 
                    overflow-x: auto; 
                  }
                `,
                skin: "oxide-dark",
                content_css: "dark",
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RTE;
