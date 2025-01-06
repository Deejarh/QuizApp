interface ProgressProps {
    answer: number | null;
    index: number;
    totalQuestion: number;
  }
export default function Progress ({totalQuestion, index, answer}: ProgressProps) {
return (
    <div className=" mb-12">
         <progress
          className=' w-full top-2 h-6 rounded-xl'
        max={totalQuestion}
        value={index + Number(answer !== null)}
      ></progress>
    </div>
)
}